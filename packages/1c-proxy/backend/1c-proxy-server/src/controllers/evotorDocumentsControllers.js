const agent = require('superagent');
const helperAuth = require('../lib/helperAuth');
const pino = require('pino')();
const sendingNotifications = require('../lib/notification/sendingNotifications');
const sendErrorToAdmin = require('../lib/notification');
const BugHolder = require('../lib/BugHolder');

module.exports = {
  getProducts: function getProducts(request, reply) {
    const { hash, url } = helperAuth(request, reply);
    agent
      .get(`${url}/hs/evotor/products/stores/${request.params.storeUuid}`)
      .set('Authorization', `Basic ${hash}`)
      .query(request.query)
      .end((error, response) => {
        if (error) {
          pino.error(error);
          sendErrorToAdmin(request, error, url);
          reply(error);
          return false;
        }

        sendingNotifications(response.body, request.auth.credentials, request.db.User, 1);

        pino.info(response.body);

        reply(response.body);
        return true;
      });
  },

  pushProducts: function pushProducts(request, reply) {
    const { hash, url } = helperAuth(request, reply);
    agent
      .post(`${url}/hs/evotor/products/stores/${request.params.storeUuid}`)
      .set('Authorization', `Basic ${hash}`)
      .send(request.payload)
      .end((error, response) => {
        if (error) {
          pino.error(error);
          sendErrorToAdmin(request, error, url);
          reply(error);
          return false;
        }

        sendingNotifications(response.body, request.auth.credentials, request.db.User, 2);

        pino.info(response.body);

        reply(response.body);
        return true;
      });
  },

  documents: function documents(request, reply) {
    const { hash, url } = helperAuth(request, reply);

    agent
      .put(`${url}/hs/evotor/documents/stores/${request.params.storeUuid}`)
      .set('Authorization', `Basic ${hash}`)
      .send(request.payload)
      .end((error, response) => {
        if (error) {
          pino.error(error);
          const bug = new BugHolder(request);
          bug.send();
          sendErrorToAdmin(request, error, url);
          reply(error);
          return false;
        }

        sendingNotifications(response.body, request.auth.credentials, request.db.User, 3);

        pino.info(response.body);
        reply(response.body);
        return true;
      });
  }
};
