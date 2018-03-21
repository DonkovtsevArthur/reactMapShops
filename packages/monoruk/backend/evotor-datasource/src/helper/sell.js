const moment = require('moment');
const logger = require('pino')();
const prop = require('../constants');

const getCloseResultSum = ({ closeResultSum, type }) =>
  type === 'SELL' ? closeResultSum : -closeResultSum;
const getCloseSum = ({ closeSum, type }) => (type === 'SELL' ? closeSum : -closeSum);

function parseTransactions(transactions, mainProperty, positions) {
  let property = { ...mainProperty };

  const transaction = transactions.shift();
  if (transaction.type !== prop.REGISTER_POSITION)
    throw new Error('Неверный начальный тип транзакции');

  property = {
    ...property,
    alcoholByVolume: transaction.alcoholByVolume || 0,
    alcoholProductKindCode: transaction.alcoholProductKindCode || 0,
    balanceQuantity: transaction.balanceQuantity || 0,
    barcode: transaction.barcode || '',
    productCode: transaction.commodityCode || '',
    productUuid: transaction.commodityUuid || '',
    productName: transaction.commodityName ? transaction.commodityName.replace("'", ' ') : '',
    productType: transaction.commodityType || 'NORMAL',
    costPrice: transaction.costPrice || 0,
    mark: transaction.mark || '',
    measureName: transaction.measureName || 'шт',
    tareVolume: transactions.tareVolume || 0,
    price: transaction.price || 0,
    quantity: transaction.quantity || 0
  };

  const discount = transactions.shift();
  let tax;

  if (discount.type !== prop.DISCOUNT_POSITION) {
    tax = discount;
  } else {
    property = {
      ...property,
      discountPositionPercent: discount.discountPositionPercent || 0,
      discountPositionSum: discount.discountPositionSum || 0,
      discountDocumentSum: discount.discountDocumentSum || 0
    };
    tax = transactions.shift();
  }

  if (tax.type !== prop.POSITION_TAX) throw new Error('Неверная последовательность транзакций');
  property = {
    ...property,
    taxResultPrice: tax.resultPrice || 0,
    taxResultSum: tax.resultSum || 0,
    resultTaxSum: tax.resultTaxSum || 0,
    tax: tax.tax || '',
    taxPercent: tax.taxPercent || 0,
    taxRateCode: tax.taxRateCode || '',
    taxSum: tax.taxSum || 0,
    profit: tax.resultSum - property.costPrice
  };

  positions.push(property);

  if (transactions.length > 0) {
    return parseTransactions(transactions, mainProperty, positions);
  }
  return positions;
}

function parseSell(document, storeUuid) {
  logger.info('document', document);
  let mainProperty = {
    ...prop.defaultDocumentProperty
  };
  mainProperty = {
    ...mainProperty,
    dateDoc: moment(document.openDate).format('YYYY-MM-DD HH:mm:ss'),
    documentUuid: document.uuid,
    storeUuid,
    deviceUuid: document.deviceUuid,
    deviceId: document.deviceId || '',
    documentType: document.type,
    sessionNumber: document.sessionNumber || '',
    closeDate: moment(document.closeDate).format('YYYY-MM-DD HH:mm:ss'),
    openDate: moment(document.openDate).format('YYYY-MM-DD HH:mm:ss'),
    sessionUuid: document.sessionUUID || '',
    closeResultSum: parseFloat(getCloseResultSum(document)) || 0,
    closeSum: parseFloat(document.closeSum) || 0,
    number: document.number || 0
  };

  const transactions = document.transactions;

  const open = transactions.shift();
  if (open.type !== prop.DOCUMENT_OPEN) throw new Error('Неверный начальный тип транзакции');

  mainProperty = {
    ...mainProperty,
    userUuid: open.userUuid,
    timeZone: open.timezone / 1000 || 0,
    clientPhone: open.clientPhone || '', // new string
    clientName: open.clientName || '', // new string
    couponNumber: open.couponNumber || 0 // new number
  };

  const close = transactions.pop();
  if (close.type !== prop.DOCUMENT_CLOSE) throw new Error('Неверный конечный тип транзакции');

  mainProperty = {
    ...mainProperty,
    totalQuantity: close.quantity || 0
  };

  const clearTransactions = transactions.filter(transaction => {
    switch (transaction.type) {
      case prop.PAYMENT:
        if (transaction.sum > 0) {
          mainProperty.paymentType = transaction.paymentType || 'CASH';
          mainProperty.rrn = transaction.rrn || '';
          logger.info('transaction ---- >', transaction);
          logger.info('transaction sum ---- >', transaction.sum);
          mainProperty.paymentSum = mainProperty.paymentSum
            ? mainProperty.paymentSum + transaction.sum
            : transaction.sum;
          logger.info('main property', mainProperty.paymentSum);
          return false;
        }
        mainProperty.oddMoney = mainProperty.oddMoney
          ? mainProperty.oddMoney + transaction.sum
          : transaction.sum;
        mainProperty.rrn = transaction.rrn || '';
        mainProperty.paymentType = transaction.paymentType || 'CASH';
        return false;
      case prop.DISCOUNT_DOCUMENT_POSITION:
        return false;
      case prop.REGISTER_POSITION:
      case prop.DISCOUNT_POSITION:
      case prop.POSITION_TAX:
        return true;
      default:
        return false;
    }
  });

  return parseTransactions(clearTransactions, mainProperty, []);
}

module.exports = parseSell;