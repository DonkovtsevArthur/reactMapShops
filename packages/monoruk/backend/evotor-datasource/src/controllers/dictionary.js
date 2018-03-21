const pino = require('pino')();
const agent = require('superagent');
const parser = require('../helper/dictionaryParser');
const logger = require('pino')();

module.exports = {
  async stores(request, reply) {
    try {
      logger.info('start store');
      const parsedStores = parser(request.payload);
      logger.info(parsedStores);
      await agent
        .put(`${process.env.MONITOR_URL}/dictionary/storeUuid`)
        .send(parsedStores)
        .set('Authorization', request.headers.authorization)
        .set('Accept', 'application/json');
      reply();
    } catch (error) {
      pino.error(error);
      reply();
    }
  },
  async devices(request, reply) {
    try {
      logger.info('start devices');
      const parsedDevices = parser(request.payload);
      logger.info(parsedDevices);
      await agent
        .put(`${process.env.MONITOR_URL}/dictionary/deviceUuid`)
        .send(parsedDevices)
        .set('Authorization', request.headers.authorization)
        .set('Accept', 'application/json');
      reply();
    } catch (error) {
      pino.error(error);
      reply();
    }
  },
  async employees(request, reply) {
    try {
      logger.info('start employees');
      const parsedEmployees = parser(request.payload);
      logger.info(parsedEmployees);
      logger.info('header --- >', request.headers);
      await agent
        .put(`${process.env.MONITOR_URL}/dictionary/userUuid`)
        .send(parsedEmployees)
        .set('Authorization', request.headers.authorization)
        .set('Accept', 'application/json');
      reply();
    } catch (error) {
      pino.error(error);
      reply();
    }
  }
};
