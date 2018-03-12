const pino = require('pino')();
const ClickHouse = require('@apla/clickhouse');
const Boom = require('boom');
const moment = require('moment');
const parse = require('../helper');
const prop = require('../constants');
const getShop = require('../sqlQuery/getShop');
const getSingleShop = require('../sqlQuery/getSingleShop');
const getSingleShopsTotalInfo = require('../helper/getSingleShopsTotalInfo');

const ch = new ClickHouse(prop.clickhouseOptions);

module.exports = {
  async getShop(request, reply) {
    try {
      const user = request.auth.credentials;
      const storeInfo = [];
      const storeUuids = user.stores.map(item => item.uuid);
      const interval = request.query.interval;

      const {
        ltCloseDate,
        gtCloseDate,
        prevLtCloseDate,
        prevGtCloseDate,
      } = parse.getDate(interval);
      pino.info('user --->', user);
      const stream = ch.query(
        getShop(
          user.uuid,
          ltCloseDate,
          gtCloseDate,
          storeUuids,
          moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
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
        if (!prevLtCloseDate && !prevGtCloseDate) {
          reply(parse.getShopsTotalInfo(storeInfo, user.stores));
        } else {
          const prevStoreInfo = [];
          const prevStream = ch.query(
            getShop(
              user.uuid,
              prevLtCloseDate,
              prevGtCloseDate,
              storeUuids,
              moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
            )
          );

          prevStream.on('data', (row) => {
            prevStoreInfo.push(row);
          });

          prevStream.on('error', (error) => {
            pino.error(error);
            reply(Boom.badImplementation(error.message));
          });

          prevStream.on('end', () => {
            const inCompareWithLastInterval = {
              total: 0,
              receiptsCount: 0,
              average: 0,
            };
            const result = parse.getShopsTotalInfo(storeInfo, user.stores);
            const { allShopsData } = parse.getShopsTotalInfo(prevStoreInfo, user.stores);

            const currentTotal = result.allShopsData.total;
            const prevTotal = allShopsData.total;
            const currentReceipt = result.allShopsData.receiptsCount;
            const prevReceipt = allShopsData.receiptsCount;
            const currentAverage = result.allShopsData.average;
            const prevAverage = allShopsData.average;

            inCompareWithLastInterval.total = parse.percent(currentTotal, prevTotal);
            inCompareWithLastInterval.receiptsCount = parse.percent(currentReceipt, prevReceipt);
            inCompareWithLastInterval.average = parse.percent(currentAverage, prevAverage);

            reply({ ...result, inCompareWithLastInterval, prevPeriodAllShopsData: allShopsData });
          });
        }
      });
    } catch (error) {
      reply(Boom.badImplementation(error.message));
    }
  },
  async getSingleShop(request, reply) {
    try {
      const user = request.auth.credentials;
      const storeUuid = request.params.storeUuid;
      const interval = request.query.interval;

      const storeInfo = [];
      const {
        ltCloseDate,
        gtCloseDate,
        prevLtCloseDate,
        prevGtCloseDate,
      } = parse.getDate(interval);
      const stream = ch.query(
        getSingleShop(
          user.uuid,
          ltCloseDate,
          gtCloseDate,
          storeUuid,
          moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
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
        const storeName = user.stores.filter(
          item => item.uuid === storeUuid
        )[0].name;
        if (!prevLtCloseDate && !prevGtCloseDate) {
          reply(getSingleShopsTotalInfo(storeInfo, storeName));
        } else {
          const prevStoreInfo = [];
          const prevStream = ch.query(
            getSingleShop(
              user.uuid,
              prevLtCloseDate,
              prevGtCloseDate,
              storeUuid,
              moment(user.storeOpen, 'hmm').format('HH') * 60 * 60
            )
          );

          prevStream.on('data', (row) => {
            prevStoreInfo.push(row);
          });

          prevStream.on('error', (error) => {
            pino.error(error);
            reply(Boom.badImplementation(error.message));
          });

          prevStream.on('end', () => {
            const inCompareWithLastInterval = {
              total: 0,
              receiptsCount: 0,
              average: 0,
            };
            const result = getSingleShopsTotalInfo(storeInfo, storeName);
            const prevResult = getSingleShopsTotalInfo(prevStoreInfo, storeName);

            const currentTotal = result.total;
            const prevTotal = prevResult.total;
            const currentReceipt = result.receiptsCount;
            const prevReceipt = prevResult.receiptsCount;
            const currentAverage = result.average;
            const prevAverage = prevResult.average;

            inCompareWithLastInterval.total = parse.percent(currentTotal, prevTotal);
            inCompareWithLastInterval.receiptsCount = parse.percent(currentReceipt, prevReceipt);
            inCompareWithLastInterval.average = parse.percent(currentAverage, prevAverage);

            reply({ ...result, inCompareWithLastInterval, prevPeriodAllShopsData: prevResult });
          });
        }
      });
    } catch (error) {
      reply(Boom.badImplementation(error.message));
    }
  },
};
