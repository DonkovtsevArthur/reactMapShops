const pino = require('pino')();
const ClickHouse = require('@apla/clickhouse');
const Boom = require('boom');
const moment = require('moment');
const parse = require('../helper');
const prop = require('../constants');
const getReceipt = require('../sqlQuery/getReceipt');

const ch = new ClickHouse(prop.clickhouseOptions);

function groupObjectInArray(array, field) {
  const buffer = {};
  const grouped = array.map((item, i, arr) => {
    if (!buffer[item[field]]) {
      buffer[item[field]] = 'ok';
      return arr.slice(i).filter(elem => elem[field] === item[field]);
    }
    return null;
  });
  return grouped.filter(item => !(item === null));
}

module.exports = {
  getReceipt(request, reply) {
    try {
      const user = request.auth.credentials;
      const storeUuid = request.params.storeUuid;
      const interval = request.query.interval;

      const receipt = [];
      const {
        ltCloseDate,
        gtCloseDate,
        steps,
      } = parse.getDate(interval);

      const stream = ch.query(
        getReceipt(
          user.uuid,
          ltCloseDate,
          gtCloseDate,
          storeUuid,
          steps,
          moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
        )
      );
      stream.on('error', (error) => {
        pino.error(error);
        reply(Boom.badImplementation(error.message));
      });

      stream.on('data', (row) => {
        receipt.push(row);
      });

      stream.on('end', () => {
        const grouped = groupObjectInArray(receipt, 'documentUuid');
        const final = grouped.map((item) => {
          const newRow = {
            documentUuid: item[0].documentUuid,
            date: item[0].date,
            closeResultSum: item[0].closeResultSum,
            number: item[0].number,
          };
          newRow.items = item.map(pos => ({
            productName: pos.productName,
            price: pos.price,
            quantity: pos.quantity,
            cost: pos.cost,
          }));
          return newRow;
        });
        final.sort((a, b) => {
          switch (moment(a.date) > moment(b.date)) {
            case true:
              return 1;
            case false:
              return -1;
            default:
              return 0;
          }
        });
        reply(final);
      });
    } catch (error) {
      reply(Boom.badImplementation(error.message));
    }
  },
};
