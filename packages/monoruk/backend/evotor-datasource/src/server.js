const Hapi = require('hapi');
// plugins
const pino = require('pino')();
// auth
const AuthBearer = require('hapi-auth-bearer-token');
// lib
// const mongoConnect = require('./db');
const integration = require('./auth');
// routes
const evotorDocumentRouter = require('./routes/evotorDocumentRouter');
const evotorDictionariesRoutes = require('./routes/evotorDictionaries');
const prevAction = require('./routes/prevAction');


module.exports = async function returnServer(config) {
  try {
    const server = new Hapi.Server();
    server.connection({ port: config.port });

    server.register([AuthBearer], async () => {
      server.auth.strategy('integration', 'bearer-access-token', {
        validateFunc: integration,
      });
      server.route(evotorDocumentRouter);
      server.route(evotorDictionariesRoutes);
      server.route(prevAction);
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
      const start = await server.start();
      if (start instanceof Error) throw new Error('Ошибка запуска сервера');
      pino.info('Server running at:', server.info.uri);
    });
  } catch (error) {
    pino.error(error.message, error);
  }
};

