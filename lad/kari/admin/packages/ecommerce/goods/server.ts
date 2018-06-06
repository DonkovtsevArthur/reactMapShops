import * as Hemera from 'nats-hemera';
import * as Nats from 'nats';
import BaseHemeraServer from 'infrastructure/BaseHemeraServer';

import Test from './hemeraRoutes/Test';

class Server extends BaseHemeraServer {
  constructor(h, routes) {
    super(h, routes);
  }
}

const nats = Nats.connect({ url: process.env.NATS_HOST });
const hemera = new Hemera(nats, {
  logLevel: 'info',
  timeout: process.env.HEMERA_TIMEOUT,
});

const server = new Server(hemera, [new Test()]);

process.on('unhandledRejection', error => {
  console.error(error.message);
  console.error(error.stack);
});

process.on('uncaughtException', error => {
  console.error(error.message);
  console.error(error.stack);
});
