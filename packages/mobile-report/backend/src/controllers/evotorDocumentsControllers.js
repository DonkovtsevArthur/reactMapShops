const pino = require('pino')();
const ClickHouse = require('@apla/clickhouse');
const Boom = require('boom');
const bluebird = require('bluebird');
const jsonSql = require('json-sql')({
  separatedValues: false,
  wrappedIdentifiers: false,
});
const parse = require('../helper');
const prop = require('../constants');

const ch = new ClickHouse(prop.clickhouseOptions);

module.exports = {
  async documents(request, reply) {
    pino.info(request.payload);
    try {
      const uuid = request.auth.credentials.uuid;
      const storeUuid = request.params.storeUuid;
      const query = bluebird.promisify(ch.query, { context: ch });
      const sql = jsonSql.build({
        type: 'insert',
        table: 'documents',
        values: parse.documents(uuid, request.payload, storeUuid),
      });
      await query(sql.query);
      reply();
    } catch (error) {
      reply(Boom.badImplementation(error.message, error));
    }
  },
  getDocuments(request, reply) {
    const rows = [];
    const stream = ch.query('SELECT * FROM documents');

    stream.on('error', (err) => {
      pino.error(err);
      reply(err).code(500);
    });

    stream.on('data', (row) => {
      rows.push(row);
    });

    stream.on('end', () => {
      reply(rows);
    });
  },
};
