// require('dotenv').config();

// db
import * as Mongoose from 'mongoose';
// nats
import * as Nats from 'nats';
import * as Hemera from 'nats-hemera';
import * as HemeraZipkin from 'hemera-zipkin';
// logger
import * as Logger from 'pino';

// controllers
import * as controllers from './controllers';

const logger = Logger();

class Preset {
  nats;
  hemera: Hemera;
  async start() {
    this.natsConnect();
  }
  natsConnect() {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, {
      logLevel: 'debug',
      childLogger: true,
      tag: 'preset-service',
    });
    this.hemera.use(HemeraZipkin, {
      host: process.env.ZIPKIN_HOST,
      sampling: 1,
      subscriptionBased: false,
      path: '/api/v1/spans',
      debug: false,
    });
    this.hemera.ready(() => {
      // 1С Интеграция и поддержка
      this.hemera.add({ topic: 'preset', cmd: 'user1cFromEvotor' }, (req, res) => {
        controllers.user1cFromEvotor(req.payload, res, this.hemera);
      });
      // Монитор франшиз
      this.hemera.add({ topic: 'preset', cmd: 'evotorMonitorClient' }, (req, res) => {
        controllers.evotorMonitorClient(req.payload, res, this.hemera);
      });
      // Редактор номенклатуры
      this.hemera.add({ topic: 'preset', cmd: 'editor' }, (req, res) => {
        controllers.editor(req.payload, res, this.hemera);
      });
      // Монитор руководителя
      this.hemera.add({ topic: 'preset', cmd: 'chiefClient' }, (req, res) => {
        controllers.chiefClient(req.payload, res, this.hemera);
      });
      // Монитор Торгового центра
      this.hemera.add({ topic: 'preset', cmd: 'mallClient' }, (req, res) => {
        controllers.mallClient(req.payload, res, this.hemera);
      });
      // Монитор Рынка
      this.hemera.add({ topic: 'preset', cmd: 'marketClient' }, (req, res) => {
        controllers.marketClient(req.payload, res, this.hemera);
      });
      // Копирование приложений с помощью токена доступа
      this.hemera.add({ topic: 'preset', cmd: 'copyApps' }, (req, res) => {
        controllers.copyApps(req.payload, res, this.hemera);
      });
    });
  }
}

try {
  const preset = new Preset();
  preset.start();
} catch (error) {
  logger.error(error);
}
