const moment = require('moment');

const appProperty = {
  SELL: 'SELL',
  REGISTER_POSITION: 'REGISTER_POSITION',
  DISCOUNT_DOCUMENT_POSITION: 'DISCOUNT_DOCUMENT_POSITION',
  POSITION_TAX: 'POSITION_TAX',
  DOCUMENT_OPEN: 'DOCUMENT_OPEN',
  DOCUMENT_CLOSE: 'DOCUMENT_CLOSE',
  PAYMENT: 'PAYMENT',
  DISCOUNT_POSITION: 'DISCOUNT_POSITION',
  DISCOUNT_DOCUMENT: 'DISCOUNT_DOCUMENT',
  OPEN_SESSION: 'OPEN_SESSION',
  CLOSE_SESSION: 'CLOSE_SESSION',
  PAYBACK: 'PAYBACK'
};

const defaultDocumentProperty = {
  documentUuid: '',
  storeUuid: '',
  deviceUuid: '',
  deviceId: '',
  documentType: 'SELL',
  closeDate: moment().format('YYYY-MM-DD kk:mm:ss'),
  openDate: moment().format('YYYY-MM-DD kk:mm:ss'),
  closeResultSum: 0,
  closeSum: 0,
  paymentSum: 0,
  oddMoney: 0,
  employeeUuid: '',
  taxSum: 0,
  timeZone: 0,
  paymentType: '',
  sessionUuid: '',
  rrn: '',
  totalDiscountPercent: 0,
  totalDiscountSum: 0,
  totalQuantity: 0,
  tareVolume: 0,
  alcoholByVolume: 0,
  alcoholProductKindCode: 0,
  balanceQuantity: 0,
  barcode: '',
  productCode: '',
  productUuid: '',
  productName: '',
  productType: 'NORMAL',
  costPrice: 0,
  mark: '',
  measureName: '',
  price: 0,
  quantity: 0,
  discountPositionPercent: 0,
  discountDocumentSum: 0,
  discountPositionSum: 0,
  taxResultPrice: 0,
  taxResultSum: 0,
  resultTaxSum: 0,
  tax: 'NO_VAT',
  taxPercent: 0,
  taxRateCode: '',
  number: 0
};

const clickhouseOptions = {
  host: process.env.CLICKHOUSE_HOST,
  port: process.env.CLICKHOUSE_PORT,
  auth: process.env.AUTH,
  queryOptions: {
    database: process.env.CLICKHOUSE_DB
  },
  dataObjects: true
};

const jsonSqlProp = {
  separatedValues: false,
  wrappedIdentifiers: false
};

module.exports = {
  ...appProperty,
  defaultDocumentProperty,
  clickhouseOptions,
  jsonSqlProp
};
