const pino = require('pino')();

module.exports = function ladStrategies(server) {
  server.auth.strategy('lad', 'bearer-token-evotor', {
    validate: async function validate(token, callback) {
      pino.info('lad auth!');
      const user = await this.db.User.findOne({ token });
      if (user) {
        return callback(null, {
          url: user.urlToBase,
          user: user.userBase,
          password: user.passwordBase,
          urlTrade: user.urlToBaseTrade,
          userTrade: user.userBaseTrade,
          passwordTrade: user.passwordBaseTrade,
          id: user._id,
          message: user.message,
          messageDate: user.messageDate,
          email: user.email,
          evotorUuid: user.evotorUuid,
          evoToken: user.evoToken,
        });
      }
      return callback('incorrect token');
    },
  });
};
