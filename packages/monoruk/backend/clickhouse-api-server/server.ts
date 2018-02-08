// require('dotenv').config();

// db
import * as ClickHouse from '@apla/clickhouse';
import * as bluebird from 'bluebird';
// nats
import * as Nats from 'nats';
import * as Hemera from 'nats-hemera';

import * as fs from 'fs-extra';

// logger
import * as Logger from 'pino';

// controllers
import * as controllers from './controllers';

// schema
import * as schema from './schema';

const logger = Logger();

const clickhouseOptions = {
  host: process.env.CLICKHOUSE_HOST,
  port: process.env.CLICKHOUSE_PORT,
  queryOptions: {
    database: process.env.CLICKHOUSE_DB,
  },
  dataObjects: true,
};

class Apps {
  model;
  nats;
  hemera;
  async start() {
    await this.copyConfigs();
    logger.info('Файлы конфигурации clickhouse скопированы');
    this.model = await this.clickhouseConnect();
    this.natsConnect(this.model);
  }
  copyConfigs() {
    const file = '/usr/src/app/clickhouse-api/configs/config.xml';
    const file2 = '/usr/src/app/clickhouse-api/configsMountPoint/config.xml';
    return fs.copy(file, file2);
  }
  async clickhouseConnect() {
    const ch = new ClickHouse(clickhouseOptions);
    const query = bluebird.promisify(ch.query, { context: ch });
    const db = await query(schema.createDb(process.env.CLICKHOUSE_DB));
    if (db instanceof Error) {
      throw new Error('Ошибка подключения к базе данных clickhouse');
    }
    const documents = await query(schema.createTable(process.env.CLICKHOUSE_DB));
    if (documents instanceof Error) {
      throw new Error('Ошибка подключения к таблице documents');
    }
    return ch;
  }
  natsConnect(model) {
    this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
    this.hemera = new Hemera(this.nats, { logLevel: 'info' });
    this.hemera.ready(() => {
      this.hemera.add({ topic: 'clickhouse', cmd: 'getColumns' }, (req, res) => {
        controllers.getColumns(req.payload, res, model);
      });
      this.hemera.add({ topic: 'clickhouse', cmd: 'data' }, (req, res) => {
        controllers.data(req.payload, res, model, this.hemera);
      });
      this.hemera.add({ topic: 'clickhouse', cmd: 'getData' }, (req, res) => {
        controllers.getData(req.payload, res, model, this.hemera);
      });
    });
  }
}

try {
  const apps = new Apps();
  apps.start();
} catch (error) {
  logger.error(error);
}
