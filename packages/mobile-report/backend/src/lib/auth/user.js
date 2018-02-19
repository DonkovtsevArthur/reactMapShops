const logger = require('pino')();

async function strategy(decoded, request, callback) {
  logger.info(decoded);
  const user = await request.db.User.findOne({ uuid: decoded.org });
  logger.info(user);
  if (!user) {
    return callback(null, false);
  }
  return callback(null, true, user);
}

module.exports = strategy;
