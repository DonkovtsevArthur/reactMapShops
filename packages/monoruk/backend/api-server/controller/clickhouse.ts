import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as Logger from 'pino';

const logger = Logger();

export async function data(request, reply) {
  try {
    const path: HemeraPath = { topic: 'clickhouse', cmd: 'data' };
    const hemera = request.hemera();
    const app = request.auth.credentials;
    const data = request.payload;
    const client = new HemeraClient(hemera, path, { app, data });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function getData(request, reply) {
  try {
    const path: HemeraPath = { topic: 'clickhouse', cmd: 'getData', timeout$: 5000 };
    const hemera = request.hemera();
    const app = request.auth.credentials;
    const query = request.payload.query;
    const client = new HemeraClient(hemera, path, { app, query });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}
