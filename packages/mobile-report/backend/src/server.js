const Hapi = require('hapi');

// plugins
const Inert = require('inert');
const Vision = require('vision');
const AuthBearer = require('hapi-auth-bearer-token');
const AuthJwt = require('hapi-auth-jwt2');
const HapiSwagger = require('hapi-swagger');
const handlebars = require('handlebars');
const path = require('path');

const ClickHouse = require('@apla/clickhouse');
const pino = require('pino')();
const bluebird = require('bluebird');

// libs
const mongoConnect = require('./lib/db');
const application = require('./lib/auth/application');
const user = require('./lib/auth/user');
const personal = require('./lib/auth/personal');

const Pack = require('../package');
const good = require('good');

// routes
const evotorUserDataRoutes = require('./routes/evotorUserDataRoutes');
const settings = require('./routes/settings');
const report = require('./routes/report');
const graph = require('./routes/graph');
const receipt = require('./routes/receipt');
const session = require('./routes/session');

// constants
const prop = require('./constants');

// controllers
const evotorDocumentRouter = require('./routes/evotorDocumentRouter');

// sql querys
const createDocumentsTable = require('./sqlQuery/createDocumentsTable');

const goodOptions = {
  includes: {
    request: ['headers', 'payload'],
    response: ['payload']
  },
  reporters: {
    logstash: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ response: '*', request: '*' }]
      },
      {
        module: 'good-hapi-graylog2',
        args: [
          {
            host: process.env.GRAYLOG_HOST,
            port: process.env.GRAYLOG_PORT,
            facility: `analytics-${process.env.GRAYLOG_TYPE}`,
            hostname: 'analytics.server',
            adapter: 'tcp'
          }
        ]
      }
    ]
  }
};

const options = {
  info: {
    title: 'API Сервера аналитики',
    version: Pack.version
  },
  grouping: 'tags'
};

module.exports = async function returnServer(config) {
  try {
    const model = await mongoConnect();
    if (model instanceof Error) throw new Error('Ошибка подключения к mongodb!');

    const server = new Hapi.Server();
    server.connection({ port: config.port });

    const ch = new ClickHouse(prop.clickhouseOptions);
    const query = bluebird.promisify(ch.query, { context: ch });

    const db = await query(`CREATE DATABASE IF NOT EXISTS ${process.env.CLICKHOUSE_DB}`);
    if (db instanceof Error) throw new Error('Ошибка подключения к базе данных clickhouse');

    const documents = await query(createDocumentsTable);
    if (documents instanceof Error) throw new Error('Ошибка подключения к таблице documents');

    server.decorate('request', 'db', model);

    server.register(
      [
        AuthBearer,
        AuthJwt,
        Inert,
        Vision,
        {
          register: HapiSwagger,
          options
        },
        {
          register: good,
          options: goodOptions
        }
      ],
      async () => {
        server.auth.strategy('application', 'bearer-access-token', {
          validateFunc: application
        });
        server.auth.strategy('personal', 'bearer-access-token', {
          validateFunc: personal
        });
        server.auth.strategy('user', 'jwt', {
          key: process.env.JWT_SECRET,
          verifyOptions: { algorithms: ['HS256'] },
          validateFunc: user
        });

        server.views({
          engines: { html: handlebars },
          path: path.resolve(__dirname, '../public')
        });

        server.route(evotorUserDataRoutes);
        server.route(evotorDocumentRouter);
        server.route(settings);
        server.route(report);
        server.route(graph);
        server.route(receipt);
        server.route(session);

        const start = await server.start();
        if (start instanceof Error) throw new Error('Ошибка запуска сервера');

        pino.info('Server running at:', server.info.uri);
      }
    );
  } catch (error) {
    pino.error(error.message, error);
  }

  // {
  //   register: good,
  //   options: goodOptions,
  // }
};
