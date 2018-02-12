const evotor = require('./strategies/evotor');
const lad = require('./strategies/lad');
const schema = require('./schema');

module.exports = function addStrategies(server) {
  server.auth.scheme('bearer-token-evotor', schema);
  evotor(server);
  lad(server);
};
