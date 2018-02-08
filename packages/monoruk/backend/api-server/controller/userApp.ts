import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as Logger from 'pino';

const logger = Logger();

export async function addDataSource(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'addDataSource', timeout$: 5000 };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function removeDataSource(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'removeDataSource' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function getAllDataSource(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'getAllDataSource' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function addWidget(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'addWidget' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function removeWidget(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'removeWidget' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function setStatusUserApp(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'setStatus' };
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
    const path: HemeraPath = { topic: 'userApp', cmd: 'get' };
    const hemera = request.hemera();
    const appId = request.payload.appId;
    const client = new HemeraClient(hemera, path, { appId });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function getConfig(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'getConfig' };
    const hemera = request.hemera();
    const credentials = request.auth.credentials;
    const client = new HemeraClient(hemera, path, { ...credentials });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function put(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'put' };
    const hemera = request.hemera();
    const userAppId = request.auth.credentials.userAppId;
    const payload = request.payload;
    const client = new HemeraClient(hemera, path, { userAppId, groups: payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function getUserToken(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'getUserToken' };
    const hemera = request.hemera();
    const appId = request.payload.appId;
    const client = new HemeraClient(hemera, path, { appId });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}

export async function copy(request, reply) {
  try {
    const path: HemeraPath = { topic: 'userApp', cmd: 'copyApp' };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { ...request.payload });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}
