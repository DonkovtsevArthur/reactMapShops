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
        resolve(Mongoose.model('userApps', schema));
      });
    });
  }
  natsConnect(model) {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, {
      logLevel: 'info',
      childLogger: true,
      tag: 'userapp-service',
    });
    this.hemera.use(HemeraZipkin, {
      host: process.env.ZIPKIN_HOST,
      sampling: 1,
      subscriptionBased: false,
      path: '/api/v1/spans',
      debug: false,
    });
    this.hemera.ready(() => {
      this.hemera.add({ topic: 'userApp', cmd: 'authorizationRead' }, (req, res) => {
        controllers.authorizationRead(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'authorizationWrite' }, (req, res) => {
        controllers.authorizationWrite(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'addDataSource' }, (req, res) => {
        controllers.addDataSource(req.payload, res, model, this.hemera);
      });
      // this.hemera.add({ topic: 'userApp', cmd: 'removeDataSource' }, (req, res) => {
      //   controllers.removeDataSource(req.payload, res, model, this.hemera);
      // });
      this.hemera.add({ topic: 'userApp', cmd: 'addWidget' }, (req, res) => {
        controllers.addWidget(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'removeWidget' }, (req, res) => {
        controllers.removeWidget(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'setStatus' }, (req, res) => {
        controllers.setStatus(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'get' }, (req, res) => {
        controllers.get(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'getConfig' }, (req, res) => {
        controllers.getConfig(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'put' }, (req, res) => {
        controllers.put(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'newVersionApp' }, (req, res) => {
        controllers.updateNewVersion(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'getUserToken' }, (req, res) => {
        controllers.getUserToken(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'getAllDataSource' }, (req, res) => {
        controllers.getAllDataSource(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'getDataSourceConfig' }, (req, res) => {
        controllers.getDataSourceConfig(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'copyWidget' }, (req, res) => {
        controllers.copyWidget(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'verify' }, (req, res) => {
        controllers.verify(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'setStatusByAccessToken' }, (req, res) => {
        controllers.setStatusByAccessToken(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'removeByAccessToken' }, (req, res) => {
        controllers.removeByAccessToken(req.payload, res, model);
      });
      this.hemera.add({ topic: 'userApp', cmd: 'allOrgId' }, (req, res) => {
        controllers.allOrgId(req.payload, res, model, this.hemera);
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
