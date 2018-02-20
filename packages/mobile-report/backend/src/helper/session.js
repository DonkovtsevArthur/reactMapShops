const moment = require('moment');
// const pino = require('pino')();
const prop = require('../constants');

function parseTransactions(transaction, doc) {
  let property = { ...doc };

  property = {
    ...property,
    employeeUuid: transaction.userUuid || '',
    timeZone: transaction.timezone / 1000 || 0
  };

  return property;
}

function parseSession(userUuid, document, storeUuid) {
  let doc = {
    ...prop.defaultDocumentProperty
  };
  doc = {
    ...doc,
    userUuid,
    date: moment(document.openDate).format('YYYY-MM-DD'),
    documentType: document.type || '',
    documentUuid: document.uuid || '',
    storeUuid,
    deviceUuid: document.deviceUuid || '',
    deviceId: document.deviceId || '',
    closeDate: moment(document.closeDate).format('YYYY-MM-DD HH:mm:ss'),
    openDate: moment(document.openDate).format('YYYY-MM-DD HH:mm:ss'),
    sessionUuid: document.sessionUUID || '',
    closeResultSum: parseFloat(document.closeResultSum) || 0,
    closeSum: parseFloat(document.closeSum) || 0,
    sessionNumber: document.sessionNumber || ''
  };

  const transaction = document.transactions[0];

  return parseTransactions(transaction, doc);
}

module.exports = parseSession;
