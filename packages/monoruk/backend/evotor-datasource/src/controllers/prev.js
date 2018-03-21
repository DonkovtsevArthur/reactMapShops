const logger = require('pino')();
const agent = require('superagent');
const parse = require('../helper');
const moment = require('moment');
const lodash = require('lodash');

async function getStores(token) {
  const stores =
    await agent
    .get('https://api.evotor.ru/api/v1/inventories/stores/search')
    .set('X-Authorization', token);
  return stores.body.map(store => store.uuid);
}

async function getDocuments(param) {
  try {
    const documents =
      await agent
      .get(`https://api.evotor.ru/api/v1/inventories/stores/${param.store}/documents`)
      .set('X-Authorization', param.token)
      .query({ ltCloseDate: param.ltCloseDate, gtCloseDate: param.gtCloseDate, types: param.type });
    return documents.body;
  } catch (error) {
    return [];
  }
}

module.exports = {
  async load(request, reply) {
    logger.info(request.payload);
    try {
      reply();
      const monitorToken = request.payload.token;
      const restToken = request.payload.evotorToken;
      const ltCloseDate = moment().utc().format('YYYY-MM-DDTHH:mm:ss.000+0000');
      const gtCloseDate = moment().add(-30, 'd').utc().format('YYYY-MM-DDTHH:mm:ss.000+0000');
      const type = 'SELL';
      const stores = await getStores(restToken);
      logger.info('stores', stores);
      const allDocuments = [];
      await Promise.all(stores.map(async (store) => {
        const documents = await getDocuments({
          store,
          ltCloseDate,
          gtCloseDate,
          type,
          token: restToken,
        });
        logger.info('documents', documents);
        const chanckedDocuments = lodash.chunk(documents, 5);
        allDocuments.push(...chanckedDocuments);
      }));
      allDocuments.map(async (chunk) => {
        const parsedDocuments = parse.documents(chunk);
        logger.info('parsedDocuments --->', parsedDocuments);
        await agent
          .post(`${process.env.MONITOR_URL}/data`)
          .send(parsedDocuments)
          .set('Authorization', `Bearer ${monitorToken}`);
      });
    } catch (error) {
      logger.info(error);
    }
  },
};
