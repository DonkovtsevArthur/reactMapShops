// require('dotenv').config();

// db
import * as Mongoose from 'mongoose';
import schema from './schema';
// nats
import * as Nats from 'nats';
import * as Hemera from 'nats-hemera';
// logger
import * as Logger from 'pino';

// controllers
import * as controllers from './controllers';

const logger = Logger();

export class DevUser {
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
        resolve(Mongoose.model('devUser', schema));
      });
    });
  }
  natsConnect(model) {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, { logLevel: 'info' });
    this.hemera.ready(() => {
      this.hemera.add({ topic: 'develop', cmd: 'login' }, (req, res) => {
        controllers.login(req.payload, res, model);
      });
      this.hemera.add({ topic: 'develop', cmd: 'add' }, (req, res) => {
        controllers.add(req.payload, res, model);
      });
      this.hemera.add({ topic: 'develop', cmd: 'appAdd' }, (req, res) => {
        controllers.appAdd(req.payload, res, model);
      });
      this.hemera.add({ topic: 'develop', cmd: 'appRemove' }, (req, res) => {
        controllers.appRemove(req.payload, res, model);
      });
    });
  }
}

try {
  const devUser = new DevUser();
  const model = devUser.start();
} catch (error) {
  logger.error(error);
}
