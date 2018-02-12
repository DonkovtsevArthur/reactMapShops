const Hapi = require('hapi');
const Inert = require('inert');
const auth = require('./lib/auth');
const prom = require('hapi-prom');
const good = require('good');
const pino = require('pino')();
const dbConnect = require('./lib/db');
const evotorUserRoutes = require('./routes/evotorUserRoutes');
const evotorStoreRoutes = require('./routes/evotorStoreRoutes');
const evotorDocumentRouter = require('./routes/evotorDocumentRouter');
const settingsRouter = require('./routes/settingsRouter');
const changeEmailRouter = require('./routes/changeEmailRouter');
const resetPassword = require('./routes/resetPassword');
const getEvotorToken = require('./routes/getEvotorToken');

const goodOptions = {
  includes: {
    request: ['headers', 'payload'],
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
        facility: `ladcloud-proxy-${process.env.GRAYLOG_TYPE}`,
        hostname: 'ladcloud.lad24.ru',
        adapter: 'tcp',
      }],
    }],
  },
};

module.exports = function returnServer(config) {
  dbConnect().then((models) => {
    const server = new Hapi.Server();
    server.connection({ port: config.port });

    prom.instrument(server);

    server.decorate('request', 'db', models);

    server.register([{
      register: good,
      options: goodOptions,
    }, Inert], () => {
      auth(server);

      server.route({
        method: 'GET',
        path: '/css/{param*}',
        handler: {
          directory: {
            path: './public/css',
            redirectToSlash: true,
            index: true,
          },
        },
      });

      server.route({
        method: 'GET',
        path: '/js/{param*}',
        handler: {
          directory: {
            path: './public/js',
            redirectToSlash: true,
            index: true,
          },
        },
      });

      server.route({
        method: 'GET',
        path: '/img/{param*}',
        handler: {
          directory: {
            path: './public/img',
            redirectToSlash: true,
            index: true,
          },
        },
      });

      server.route({
        method: '*',
        path: '/{p*}',
        handler: (request, reply) => {
          pino.info('404 -------------------------------');
          pino.info('--- headers', request.headers);
          pino.info('--- method', request.method);
          pino.info('--- path', request.path);
          pino.info('--- payload', request.payload);
          pino.info('404 -------------------------------');
          reply().code(404);
          return true;
        },
      });

      server.route(evotorUserRoutes);
      server.route(evotorStoreRoutes);
      server.route(evotorDocumentRouter);
      server.route(settingsRouter);
      server.route(changeEmailRouter);
      server.route(resetPassword);
      server.route(getEvotorToken);

      server.start((err) => {
        if (err) {
          throw err;
        }
        pino.info('Server running at:', server.info.uri);
      });
    });
  }).catch((err) => {
    pino.error(err);
    pino.error(err.stack);
  });
};
