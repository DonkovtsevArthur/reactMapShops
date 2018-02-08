// require('dotenv').config();
import * as Hapi from 'hapi';

// plugins
import * as AuthBearer from 'hapi-auth-bearer-token';
import * as AuthJwt from 'hapi-auth-jwt2';
import * as Logger from 'pino';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
import * as Susie from 'susie';
import * as Good from 'good';

// mq
import { connect } from 'nats';
import * as Hemera from 'nats-hemera';
import * as HemeraZipkin from 'hemera-zipkin';

// auth
import application from './auth/application';
import developUser from './auth/developUser';

import { HemeraClient, HemeraPath } from '../interfaces/core';

// routes
import app from './routes/app';
import develop from './routes/develop';
import user from './routes/user';
import userApp from './routes/userApp';
import clickhouse from './routes/clickhouse';
import dashboard from './routes/dashboard';
import widget from './routes/widget';
import dictionary from './routes/dictionary';
import preset from './routes/preset';
import access from './routes/access';

const logger = Logger();

const goodOptions = {
  includes: {
    request: ['headers'],
    response: ['payload'],
  },
  reporters: {
    logstash: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ response: '*', request: '*' }],
    }, {
      module: 'good-hapi-graylog2',
      args: [{
        host: process.env.GRAYLOG_HOST,
        port: process.env.GRAYLOG_PORT,
        facility: `monitor-api-${process.env.GRAYLOG_TYPE}`,
        hostname: 'monitor',
        bufferSize: 15625,
      }],
    }],
  },
};

export interface DecoratedRequest extends Hapi.Request {
  hemera():Hemera;
}
export default class Server {
  private options = {
    info: {
      title: 'API Сервера конфигураций',
      version: '0.0.1',
    },
    grouping: 'tags',
  };
  constructor(private port:string) {}
  start() {
    try {
      const server = new Hapi.Server();
      server.connection({ port: this.port, routes: { cors: true } });
      server.register(
        [
          AuthBearer,
          AuthJwt,
          Inert,
          Vision,
          Susie,
          {
            options: this.options,
            register: HapiSwagger,
          },
          {
            register: Good,
            options: goodOptions,
          },
        ],
        async () => {
          server.auth.strategy('application', 'bearer-access-token', {
            validateFunc: application,
          });
          server.auth.strategy('developUser', 'jwt', {
            key: process.env.JWT_SECRET,
            verifyOptions: { algorithms: ['HS256'] },
            validateFunc: developUser,
          });
          server.auth.strategy('lkUserRead', 'bearer-access-token', {
            validateFunc: async (token, callback) => {
              const path: HemeraPath = { topic: 'userApp', cmd: 'authorizationRead' };
              const client = new HemeraClient(hemera, path, { token });
              const app = await client.act();
              if (app) {
                callback(null, true, app);
              } else {
                callback(null, false);
              }
            },
          });
          server.auth.strategy('lkUserWrite', 'bearer-access-token', {
            validateFunc: async (token, callback) => {
              const path: HemeraPath = { topic: 'userApp', cmd: 'authorizationWrite' };
              const client = new HemeraClient(hemera, path, { token });
              const app = await client.act();
              if (app) {
                callback(null, true, app);
              } else {
                callback(null, false);
              }
            },
          });
          const nats = connect(process.env.NATS || 'nats://172.17.0.2:4222');
          const hemera = new Hemera(nats, {
            logLevel: 'debug',
            childLogger: true,
            tag: 'api-service',
          });
          hemera.use(HemeraZipkin, {
            host: process.env.ZIPKIN_HOST,
            sampling: 1,
            subscriptionBased: false,
            path: '/api/v1/spans',
            debug: false,
          });
          server.decorate('request', 'hemera', () => hemera);
          server.route(app);
          server.route(develop);
          server.route(user);
          server.route(userApp);
          server.route(clickhouse);
          server.route(dashboard);
          server.route(widget);
          server.route(dictionary);
          server.route(preset);
          server.route(access);
          await server.start();
          logger.info('Server running at:', server.info!.uri);
        });
    } catch (error) {
      logger.error(error);
    }
  }
}

const server = new Server(process.env.PORT || '5000');
server.start();
