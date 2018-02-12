const pino = require('pino')();

module.exports = function evotorStrategies(server) {
  server.auth.strategy('evotor', 'bearer-token-evotor', {
    validate: function validate(token, callback) {
      pino.info('start auth');
      pino.info(`incom token: ${token} env token: ${process.env.EVOTOR_TOKEN}`);
      if (token === process.env.EVOTOR_TOKEN) {
        return callback(null);
      }
      return callback('incorrect token');
    },
  });
};
