/// <reference path="../../interfaces/core/Widget.d.ts" />

import * as hapi from 'hapi';
import * as hemera from 'nats-hemera';
import * as boom from 'boom';
import * as Logger from 'pino';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import { DecoratedRequest } from '../server';
import { setInterval } from 'timers';

const logger = Logger();

export interface ReplyEvents extends hapi.ReplyNoContinue {
  event(data: any): void;
}

export interface WidgetController {
  get(request: DecoratedRequest, reply: hapi.ReplyNoContinue): void;
  update(request: DecoratedRequest, reply: hapi.ReplyNoContinue): void;
  events(request: DecoratedRequest, reply: ReplyEvents): void;
}

const controller: WidgetController = {
  async get(request, reply) {
    try {
      const token = request.query.token;
      const path: HemeraPath = { topic: 'widget', cmd: 'get' };
      const hemera: Hemera = request.hemera();
      const appId = request.params.appId;
      const client = new HemeraClient(hemera, path, { appId, token });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async update(request, reply) {
    try {
      const path: HemeraPath = { topic: 'widget', cmd: 'update' };
      const hemera: Hemera = request.hemera();
      const config = <Widget.WidgetConfig>request.payload;
      const client = new HemeraClient(hemera, path, { ...config });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  events(request, reply) {
    try {
      const appId = request.params.appId;
      const hemera = request.hemera();
      hemera.remove(appId, 0);
      reply.event({ id: 1, data: 'events' });
      hemera.add({ pubsub$: true, topic: appId }, () => {
        logger.info(`Новое сообщение ${request.params.widgetId}`);
        reply.event({ data: 'reload' });
      });
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
};

export default controller;

