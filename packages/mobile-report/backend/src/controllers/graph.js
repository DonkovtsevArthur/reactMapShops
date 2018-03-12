const pino = require('pino')();
const ClickHouse = require('@apla/clickhouse');
const Boom = require('boom');
const moment = require('moment');
const parse = require('../helper');
const prop = require('../constants');
const getPoints = require('../sqlQuery/getPoints');

const ch = new ClickHouse(prop.clickhouseOptions);

module.exports = {
  async getPoints(request, reply) {
    try {
      const user = request.auth.credentials;
      const interval = request.query.interval;

      if (!user) throw new Error('Пользователь не найден!');
      let storeUuids = [];
      const storeInfo = [];

      if (!request.params.storeUuid) {
        storeUuids = user.stores.map(item => item.uuid);
      } else {
        storeUuids.push(request.params.storeUuid);
      }

      const {
        ltCloseDate,
        gtCloseDate,
        step,
      } = parse.getDate(interval);
      const startSession = moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
      const stream = ch.query(
        getPoints(
          user.uuid,
          ltCloseDate,
          gtCloseDate,
          storeUuids,
          step,
          startSession,
        )
      );

      stream.on('error', (error) => {
        pino.error(error);
        reply(Boom.badImplementation(error.message));
      });

      stream.on('data', (row) => {
        storeInfo.push(row);
      });

      stream.on('end', () => {
        let total = 0;
        storeInfo.forEach((item) => { total += item.y; });
        if (step === 'days') {
          storeInfo.sort((a, b) => {
            if (b.x - a.x > 2) return 1;
            if (a.x > b.x) return 1;
            return 0;
          });
        }
        if (step === 'days') {
          const minDateTs = global.parseInt(gtCloseDate) + global.parseInt(storeInfo[0].timezone);
          const maxDateTs = global.parseInt(ltCloseDate) + global.parseInt(storeInfo[0].timezone);
          const maxDate = moment(maxDateTs, 'X');
          const maxDateWithOffset = moment(maxDate, 'X').startOf('day').add(-1, 's');
          const offsetDay = interval === 'week' ? 7 : 30;

          const diff = (maxDateTs - minDateTs) / (60 * 60 * 24);
          const daysRange = [];

          for (let i = 0; i < diff; i += 1) {
            daysRange.push({ x: moment(maxDateWithOffset).add(-i, 'd').format('D') });
          }

          const finalGraph = daysRange.map((item) => {
            const point = storeInfo.filter(day => global.parseInt(item.x) === day.x)[0];
            return {
              x: global.parseInt(item.x),
              y: point ? point.y : 0,
            };
          });
          finalGraph.reverse();
          let i = -1;
          const delDayFinalGraph = finalGraph.map((item) => { i += 1; return { x: i, y: item.y }; });
          reply({
            points: [delDayFinalGraph],
            sessionBeginsAt: moment(user.storeOpen, 'hmm').add(-offsetDay, 'd').format('YYYY-MM-DD HH:mm:ss'),
            step,
            total,
          });
          return;
        }
        const finalGraph = [];
        for (let i = 0; i <= 23; i += 1) {
          const point = storeInfo.filter(info => info.x === i)[0];
          if (point) {
            finalGraph.push(point);
          } else {
            finalGraph.push({ x: i, y: 0 });
          }
        }
        reply({
          points: [finalGraph],
          sessionBeginsAt: moment(user.storeOpen, 'hmm').format('YYYY-MM-DD HH:mm:ss'),
          step,
          total,
        });
      });
    } catch (error) {
      reply(Boom.badImplementation(error.message));
    }
  },
};
