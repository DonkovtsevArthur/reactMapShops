const pino = require('pino')();
const agent = require('superagent');
const parse = require('../helper');

module.exports = {
  async documents(request, reply) {
    pino.info(request.payload);
    try {
      const storeUuid = request.params.storeUuid;
      const parsedDocuments = parse.documents(request.payload, storeUuid);
      pino.info('--------------------------------- >');
      pino.info(parsedDocuments);
      pino.info('< ---------------------------------');
      pino.info('--------------------------------- > headers');
      pino.info(request.headers);
      pino.info('< --------------------------------- headers');
      await agent
        .post(`${process.env.MONITOR_URL}/data`)
        .send(parsedDocuments)
        .set('Authorization', request.headers.authorization)
        .set('Accept', 'application/json');
      reply();
    } catch (error) {
      pino.error(error);
      reply();
    }
  },
};
