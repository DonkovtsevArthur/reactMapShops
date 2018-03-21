const pino = require('pino')();
const sell = require('./sell');
const session = require('./session');
const prop = require('../constants');
const moment = require('moment');

module.exports = {
  documents(documents, storeUuid) {
    const result = [];
    try {
      documents.forEach(document => {
        switch (document.type) {
          case prop.PAYBACK:
          case prop.SELL:
            sell(document, storeUuid).forEach(doc => {
              result.push(doc);
            });
            return false;
          case prop.OPEN_SESSION:
          case prop.CLOSE_SESSION:
            result.push(session(document, storeUuid));
            return false;
          default:
            return false;
        }
      });
      return result;
    } catch (error) {
      return error;
    }
  }
};
