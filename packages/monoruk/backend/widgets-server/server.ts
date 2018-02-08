// require('dotenv').config();

// db
import * as Mongoose from 'mongoose';
import schema from './schema';
// nats
import * as Nats from 'nats';
import * as Hemera from 'nats-hemera';
import * as HemeraZipkin from 'hemera-zipkin';
// logger
import * as Logger from 'pino';

// controllers
import controllers from './controllers';

const logger = Logger();

class Widget {
  db;
  model;
  nats;
  hemera;
  constructor() {
    (<any>Mongoose.Promise) = global.Promise;
    this.db = Mongoose.connection;
  }
  async start() {
    this.model = await this.mongoConnect();
    this.natsConnect(this.model);
  }
  mongoConnect() {
    this.db.on('error', () => logger.error('connection error'));
    Mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
      { useMongoClient: true }
    );
    return new Promise((resolve) => {
      this.db.once('open', () => {
        resolve(Mongoose.model('widget', schema));
      });
    });
  }
  natsConnect(model) {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, {
      logLevel: 'debug',
      childLogger: true,
      tag: 'widget-service',
    });
    this.hemera.use(HemeraZipkin, {
      host: process.env.ZIPKIN_HOST,
      sampling: 1,
      subscriptionBased: false,
      path: '/api/v1/spans',
      debug: false,
    });
    this.hemera.ready(() => {
      this.hemera.add({ topic: 'widget', cmd: 'get' }, ({ payload }, response) => {
        controllers.get({
          response,
          model,
          appId: payload.appId,
          token: payload.token,
          hemera: this.hemera,
        });
      });
      this.hemera.add({ topic: 'widget', cmd: 'update' }, ({ payload }, response) => {
        controllers.update({ payload, response, model });
      });
    });
  }
}

try {
  const devUser = new Widget();
  const model = devUser.start();
} catch (error) {
  logger.error(error);
}
