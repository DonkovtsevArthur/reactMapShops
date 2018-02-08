import * as Hapi from 'hapi';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import * as Logger from 'pino';
import { DecoratedRequest } from '../server';

const logger = Logger();

export async function start(request: DecoratedRequest, reply: Hapi.ReplyNoContinue) {
  try {
    const orgId = request.payload.orgId;
    const datasourceId = request.payload.datasourceId;
    const token = request.payload.token;
    const preset = request.params.preset;
    const path: HemeraPath = { topic: 'preset', cmd: preset, timeout$: 5000 };
    const hemera = request.hemera();
    const client = new HemeraClient(hemera, path, { orgId, datasourceId, preset, token });
    const result = await client.act();
    reply(result!);
  } catch (error) {
    logger.info(error);
    reply(error);
  }
}
