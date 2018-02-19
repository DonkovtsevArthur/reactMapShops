// const pino = require('pino')();
const agent = require('superagent');
const moment = require('moment');
const ClickHouse = require('@apla/clickhouse');
const Boom = require('boom');
const bluebird = require('bluebird');
const jsonSql = require('json-sql')({
  separatedValues: false,
  wrappedIdentifiers: false,
});
const { union } = require('lodash');
const logger = require('pino')();
const parse = require('../helper');
const prop = require('../constants');
const { getStores, getDocuments } = require('../helper/parseNewDocuments');

const ch = new ClickHouse(prop.clickhouseOptions);
const query = bluebird.promisify(ch.query, { context: ch });

module.exports = {
  async fillStore(request, reply) {
    try {
      const uuid = request.payload.orgId;
      const token = request.payload.evotorToken;
      const stores = await getStores(token);
      logger.info('stores', stores);
      await Promise.all(stores.map(async (store) => {
        const documents = await getDocuments(token, store.uuid);
        const parsedDocuments = parse.documents(uuid, documents, store.uuid)
        logger.info('parse', parsedDocuments);
        if (parsedDocuments.length > 0) {
          const sql = jsonSql.build({
            type: 'insert',
            table: 'documents',
            values: parsedDocuments,
          });
          logger.info('query', sql.query);
          await query(sql.query);
        }
      }));
      reply('Ok');
    } catch (error) {
      reply('Ok');
      logger.error(error);
    }
  },
  async storeOpen(request, reply) {
    try {
      const user = request.auth.credentials;
      const storeOpen = request.payload.storeOpen;
      const parsedStoreOpen = global.parseInt(storeOpen);
      if (parsedStoreOpen > 2359 || parsedStoreOpen < 0) {
        throw new Error('bad time');
      }
      await user.update({ $set: { storeOpen } });
      reply();
    } catch (error) {
      reply(Boom.badImplementation(error.message, error));
    }
  },
  async delete(request, reply) {
    try {
      await query('DROP TABLE documents');
      reply();
    } catch (error) {
      reply(Boom.badImplementation(error.message, error));
    }
  },
  settingsPage(request, reply) {
    try {
      const token = request.query.token;
      if (!token) {
        reply.view('settings', {});
        return;
      }
      agent
      .get('http://lk-test.lad24.ru/evotor/userInfo')
      .query({ token, json: true })
      .then((response) => {
        const user = response.body;
        reply.view('settings', { user });
      })
      .catch(() => {
        reply.view('settings', {});
        return false;
      });
    } catch (error) {
      reply(Boom.badImplementation(error.message, error));
    }
  },
};
