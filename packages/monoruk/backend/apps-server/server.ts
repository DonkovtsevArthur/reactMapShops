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

class Apps {
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
        resolve(Mongoose.model('App', schema));
      });
    });
  }
  natsConnect(model) {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, { logLevel: 'info' });
    this.hemera.ready(() => {
      this.hemera.add({ topic: 'app', cmd: 'add' }, (req, res) => {
        controllers.addApp(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'app', cmd: 'update' }, (req, res) => {
        controllers.updateApp(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'app', cmd: 'getAll' }, (req, res) => {
        controllers.getAllApp(req.payload, res, model);
      });
      this.hemera.add({ topic: 'app', cmd: 'remove' }, (req, res) => {
        controllers.deleteApp(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'app', cmd: 'get' }, (req, res) => {
        controllers.getApp(req.payload, res, model);
      });
      this.hemera.add({ topic: 'app', cmd: 'getAppForUser' }, (req, res) => {
        controllers.getAppForUser(req.payload, res, model);
      });
      this.hemera.add({ topic: 'app', cmd: 'status' }, (req, res) => {
        controllers.setStatus(req.payload, res, model);
      });
    });
  }
}

try {
  const apps = new Apps();
  const model = apps.start();
} catch (error) {
  logger.error(error);
}
