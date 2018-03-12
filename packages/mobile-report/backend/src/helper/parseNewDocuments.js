const agent = require('superagent');
const moment = require('moment');

module.exports = {
  getStores(token) {
    return new Promise((resolve, reject) => {
      agent
        .get('https://api.evotor.ru/api/v1/inventories/stores/search')
        .set('x-authorization', token)
        .then(response => resolve(response.body))
        .catch(error => reject(error));
    });
  },
  getDocuments(token, storeUuid) {
    return new Promise((resolve) => {
      agent
        .get(`https://api.evotor.ru/api/v1/inventories/stores/${storeUuid}/documents`)
        .set({ 'x-authorization': token })
        .query({
          ltCloseDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.000+0000'),
          gtCloseDate: moment().utc().add(-30, 'd').format('YYYY-MM-DDTHH:mm:ss.000+0000'),
          types: 'SELL,OPEN_SESSION,CLOSE_SESSION',
        })
        .then(response => resolve(response.body))
        .catch(() => resolve([]));
    });
  },
};
