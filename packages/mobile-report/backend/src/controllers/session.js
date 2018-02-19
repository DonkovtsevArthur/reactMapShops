const pino = require('pino')();
const ClickHouse = require('@apla/clickhouse');
const Boom = require('boom');
const moment = require('moment');
const parse = require('../helper');
const prop = require('../constants');
const getSession = require('../sqlQuery/getSession');

const ch = new ClickHouse(prop.clickhouseOptions);

module.exports = {
  getSession(request, reply) {
    try {
      const user = request.auth.credentials;
      const storeUuid = request.params.storeUuid;
      const interval = request.query.interval;

      const sessions = [];
      const { ltCloseDate, gtCloseDate, steps } = parse.getDate(interval);

      pino.info(
        'query ----->',
        getSession(
          user.uuid,
          ltCloseDate,
          gtCloseDate,
          storeUuid,
          steps,
          moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
        )
      );

      const stream = ch.query(
        getSession(
          user.uuid,
          ltCloseDate,
          gtCloseDate,
          storeUuid,
          steps,
          moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
        )
      );
      stream.on('error', error => {
        pino.error(error);
        reply(Boom.badImplementation(error.message));
      });

      stream.on('data', row => {
        sessions.push(row);
      });

      stream.on('end', () => {
        reply(sessions);
      });
    } catch (error) {
      reply(Boom.badImplementation(error.message));
    }
  }
};
