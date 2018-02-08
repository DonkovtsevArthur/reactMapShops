import * as Hapi from 'hapi';
import * as Hemera from 'nats-hemera';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as App from '../../interfaces/core/App';
import { DecoratedRequest } from '../server';
import * as Logger from 'pino';

export interface AppController {
  get(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  getAll(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  add(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  update(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  remove(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
  status(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
}
const logger = Logger();

const controller:AppController = {
  async get(request, reply) {
    try {
      const path: HemeraPath = { topic: 'app', cmd: 'get' };
      const hemera: Hemera = request.hemera();
      const credentials: App.Credentials = request.auth.credentials;
      const payload: App.IAppGetPayload = request.payload;
      const data = { ...payload, ...credentials };
      const client = new HemeraClient(hemera, path, data);
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async getAll(request, reply) {
    try {
      const path: HemeraPath = { topic: 'app', cmd: 'getAll' };
      const hemera: Hemera = request.hemera();
      const client = new HemeraClient(hemera, path, {});
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async add(request, reply) {
    try {
      const path: HemeraPath = { topic: 'app', cmd: 'add' };
      const hemera: Hemera = request.hemera();
      const credentials: App.Credentials = request.auth.credentials;
      const payload: App.IApp = request.payload;
      const data = { ...payload, ...credentials };
      const client = new HemeraClient(hemera, path, data);
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async update(request, reply) {
    try {
      const path: HemeraPath = { topic: 'app', cmd: 'update', timeout$: 20000 };
      const hemera: Hemera = request.hemera();
      const credentials: App.Credentials = request.auth.credentials;
      const payload: App.IApp = request.payload;
      const data = { ...payload, ...credentials };
      const client = new HemeraClient(hemera, path, data);
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async remove(request, reply) {
    try {
      const path: HemeraPath = { topic: 'app', cmd: 'remove' };
      const hemera: Hemera = request.hemera();
      const credentials = request.auth.credentials;
      const data = { ...request.payload, ...credentials };
      const client = new HemeraClient(hemera, path, data);
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
  async status(request, reply) {
    try {
      const path: HemeraPath = { topic: 'app', cmd: 'status' };
      const hemera: Hemera = request.hemera();
      const credentials = request.auth.credentials;
      const data = { ...request.payload, ...credentials };
      const client = new HemeraClient(hemera, path, data);
      const result = await client.act();
      reply(result!);
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
};

export default controller;
