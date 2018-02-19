// const logger = require('pino')();
const sell = require('./sell');
const session = require('./session');
const prop = require('../constants');
const moment = require('moment');

function getInterval(interval) {
  const valid = /((0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d)\-((0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d)/.test(
    interval
  );
  if (valid) {
    const start = `${interval.slice(0, interval.indexOf('-'))} 00:00:01`;
    const end = `${interval.slice(interval.indexOf('-') + 1, interval.length)} 23:59:59`;
    const gtCloseDate = moment(start, 'DD.MM.YYYY HH:mm:ss').format('X');
    const ltCloseDate = moment(end, 'DD.MM.YYYY HH:mm:ss').format('X');
    return {
      ltCloseDate,
      gtCloseDate,
      prevLtCloseDate: null,
      prevGtCloseDate: null,
      step: 'free'
    };
  }
  return {
    ltCloseDate: moment().format('X'),
    gtCloseDate: moment().format('X'),
    prevLtCloseDate: null,
    prevGtCloseDate: null,
    step: 'hours'
  };
}

module.exports = {
  documents(userUuid, documents, storeUuid) {
    const result = [];
    try {
      documents.forEach(document => {
        switch (document.type) {
          case prop.PAYBACK:
          case prop.SELL:
            sell(userUuid, document, storeUuid).forEach(doc => {
              result.push(doc);
            });
            return false;
          case prop.OPEN_SESSION:
          case prop.CLOSE_SESSION:
            result.push(session(userUuid, document, storeUuid));
            return false;
          default:
            return false;
        }
      });
      return result;
    } catch (error) {
      return error;
    }
  },
  getDate(interval) {
    // Перенести в отдельный файл
    switch (interval) {
      case 'today':
        return {
          ltCloseDate: moment().format('X'),
          gtCloseDate: moment().format('X'),
          prevLtCloseDate: null,
          prevGtCloseDate: null,
          step: 'hours'
        };
      case 'yesterday':
        return {
          ltCloseDate: moment().format('X'),
          gtCloseDate: moment()
            .add(-1, 'd')
            .format('X'),
          prevLtCloseDate: moment()
            .add(-1, 'd')
            .format('X'),
          prevGtCloseDate: moment()
            .add(-2, 'd')
            .format('X'),
          step: 'hours'
        };
      case 'week':
        return {
          ltCloseDate: moment().format('X'),
          gtCloseDate: moment()
            .add(-7, 'd')
            .format('X'),
          prevLtCloseDate: moment()
            .add(-7, 'd')
            .format('X'),
          prevGtCloseDate: moment()
            .add(-14, 'd')
            .format('X'),
          step: 'days'
        };
      case 'month':
        return {
          ltCloseDate: moment().format('X'),
          gtCloseDate: moment()
            .add(-30, 'd')
            .format('X'),
          prevLtCloseDate: moment()
            .add(-30, 'd')
            .format('X'),
          prevGtCloseDate: moment()
            .add(-60, 'd')
            .format('X'),
          step: 'days'
        };
      default:
        return getInterval(interval);
    }
  },
  getShopsTotalInfo(shops, shopsArr) {
    // Перенести в отдельный файл
    const allShopsData = {
      total: 0,
      receiptsCount: 0
    };
    const shopsTotal = [];
    let average = 0;
    shops.forEach(shop => {
      allShopsData.total += shop.total;
      allShopsData.receiptsCount += global.parseInt(shop.receiptsCount);
      average += shop.average;
      const store = shopsArr.filter(storeItem => storeItem.uuid === shop.storeUuid)[0];
      shopsTotal.push({
        ...shop,
        name: store.name,
        address: store.address,
        total: shop.total,
        average: shop.average,
        receiptsCount: global.parseInt(shop.receiptsCount)
      });
    });
    allShopsData.average = global.parseInt((average / shopsArr.length).toFixed(2));
    return { shops: shopsTotal, allShopsData };
  },
  percent(num1, num2) {
    // Перенести в отдельный файл
    return global.parseInt(num1 / num2 * 100 - 100);
  }
};
