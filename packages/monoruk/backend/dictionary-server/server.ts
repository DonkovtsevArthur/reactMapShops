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

class Dictionary {
  db;
  model;
  nats;
  hemera;
  constructor() {
    (<any>Mongoose.Promise) = global.Promise;
    this.db = Mongoose.connection;
  }
  async start() {
    this.mongoConnect();
    this.natsConnect(this.db);
  }
  mongoConnect() {
    this.db.on('error', () => logger.error('connection error'));
    Mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
      { useMongoClient: true }
    );
  }
  natsConnect(db) {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, { logLevel: 'info' });
    this.hemera.ready(() => {
      this.hemera.add({ topic: 'dictionary', cmd: 'create' }, (req, res) => {
        controllers.create(req.payload, res, db);
      });
      this.hemera.add({ topic: 'dictionary', cmd: 'update' }, (req, res) => {
        controllers.update(req.payload, res, db);
      });
    });
  }
}

try {
  const dictionary = new Dictionary();
  dictionary.start();
} catch (error) {
  logger.error(error);
}
