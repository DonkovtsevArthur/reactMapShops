import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as Logger from 'pino';

const logger = Logger();

export async function add(request, reply) {
  try {
    const path: HemeraPath = { topic: 'user', cmd: 'add' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function changeStatus(request, reply) {
  try {
    const path: HemeraPath = { topic: 'user', cmd: 'changeStatus' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}