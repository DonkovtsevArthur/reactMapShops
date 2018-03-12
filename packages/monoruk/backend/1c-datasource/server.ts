import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as Pino from 'pino';

const logger = Pino();

export async function init(): Promise<Hapi.Server> {
  try {
    const server = new Hapi.Server({
      port: process.env.PORT || 5000,
      routes: {
        cors: { origin: ['*'] }
      }
    })
    
  } catch (error) {
    logger.error('error init server', error);
  }
}
