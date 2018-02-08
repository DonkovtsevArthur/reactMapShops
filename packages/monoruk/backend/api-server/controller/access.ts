import * as Hapi from 'hapi';
import * as Hemera from 'nats-hemera';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as App from '../../interfaces/core/App';
import { DecoratedRequest } from '../server';
import * as Logger from 'pino';

export interface AppController {
  share(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  openShare(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  closeShare(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  removeShare(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  getShareToApp(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  copy(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
}
const logger = Logger();

const controller:AppController = {
  async share(request, reply) {
    try {
      const path: HemeraPath = { topic: 'access', cmd: 'share' };
      const hemera: Hemera = request.hemera();
      const client = new HemeraClient(hemera, path, { ...request.payload });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async openShare(request, reply) {
    try {
      const path: HemeraPath = { topic: 'access', cmd: 'openShare' };
      const hemera: Hemera = request.hemera();
      const client = new HemeraClient(hemera, path, { ...request.payload });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async closeShare(request, reply) {
    try {
      const path: HemeraPath = { topic: 'access', cmd: 'closeShare' };
      const hemera: Hemera = request.hemera();
      const client = new HemeraClient(hemera, path, { ...request.payload });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async removeShare(request, reply) {
    try {
      const path: HemeraPath = { topic: 'access', cmd: 'removeShare' };
      const hemera: Hemera = request.hemera();
      const client = new HemeraClient(hemera, path, { ...request.payload });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async getShareToApp(request, reply) {
    try {
      const path: HemeraPath = { topic: 'access', cmd: 'getShareToApp' };
      const hemera: Hemera = request.hemera();
      const client = new HemeraClient(hemera, path, { ...request.payload });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async copy(request, reply) {
    try {
      const path: HemeraPath = { topic: 'access', cmd: 'copy' };
      const hemera: Hemera = request.hemera();
      const client = new HemeraClient(hemera, path, { ...request.payload });
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
};

export default controller;
