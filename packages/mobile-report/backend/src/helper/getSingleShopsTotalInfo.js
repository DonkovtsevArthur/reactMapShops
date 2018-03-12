const moment = require('moment');

module.exports = (info, storeName) => {
  let sell = {};
  let open = {};
  let close = {};
  info.forEach((item) => {
    switch (item.documentType) {
      case 'SELL':
        sell = { ...item };
        break;
      case 'OPEN_SESSION':
        open = { ...item };
        break;
      case 'CLOSE_SESSION':
        close = { ...item };
        break;
      default:
        break;
    }
  });
  return {
    total: sell.total,
    receiptsCount: sell.receiptsCount,
    average: sell.average,
    openedAt: open.openedAt ? moment(open.openedAt).add(open.tz, 's').format('HH:mm') : null,
    closedAt: close.closedAt ? moment(close.closedAt).add(open.tz, 's').format('HH:mm') : null,
    fistSell: sell.openedAt,
    lastSell: sell.closedAt,
    name: storeName,
  };
};
