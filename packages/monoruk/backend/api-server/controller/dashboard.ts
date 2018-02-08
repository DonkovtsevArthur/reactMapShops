import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as Logger from 'pino';

const logger = Logger();

export async function add(request, reply) {
  try {
    const path: HemeraPath = { topic: 'dashboard', cmd: 'add' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function getAll(request, reply) {
  try {
    const path: HemeraPath = { topic: 'dashboard', cmd: 'getAll' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function get(request, reply) {
  try {
    const path: HemeraPath = { topic: 'dashboard', cmd: 'get' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function place(request, reply) {
  try {
    const path: HemeraPath = { topic: 'dashboard', cmd: 'place' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function remove(request, reply) {
  try {
    const path: HemeraPath = { topic: 'dashboard', cmd: 'remove' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}
