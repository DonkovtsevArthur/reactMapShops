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

class Access {
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
        resolve(Mongoose.model('access', schema));
      });
    });
  }
  natsConnect(model) {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, { logLevel: 'info' });
    this.hemera.ready(() => {
      this.hemera.add({ topic: 'access', cmd: 'share' }, (req, res) => {
        controllers.share(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'access', cmd: 'closeShare' }, (req, res) => {
        controllers.closeShare(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'access', cmd: 'openShare' }, (req, res) => {
        controllers.openShare(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'access', cmd: 'removeShare' }, (req, res) => {
        controllers.removeShare(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'access', cmd: 'getShareToApp' }, (req, res) => {
        controllers.getShareToApp(req.payload, res, model);
      });
      this.hemera.add({ topic: 'access', cmd: 'getShareToToken' }, (req, res) => {
        controllers.getShareToToken(req.payload, res, model);
      });
      this.hemera.add({ topic: 'access', cmd: 'copy' }, (req, res) => {
        controllers.copy(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'access', cmd: 'getParent' }, (req, res) => {
        controllers.getParent(req.payload, res, model);
      });
    });
  }
}

try {
  const access = new Access();
  const model = access.start();
} catch (error) {
  logger.error(error);
}
