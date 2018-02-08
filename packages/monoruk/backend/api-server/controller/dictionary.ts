import * as Hapi from 'hapi';
import * as Hemera from 'nats-hemera';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as App from '../../interfaces/core/App';
import { DecoratedRequest } from '../server';
import * as Logger from 'pino';

export interface DictionaryController {
  save(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
}
const logger = Logger();

const controller:DictionaryController = {
  async save(request, reply) {
    try {
      const path: HemeraPath = { topic: 'dictionary', cmd: 'create' };
      const hemera: Hemera = request.hemera();
      const credentials: App.Credentials = request.auth.credentials;
      const payload = request.payload;
      const dictionary = request.params.dictionary;
      const data = { dictionary, data: payload, ...credentials };
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
