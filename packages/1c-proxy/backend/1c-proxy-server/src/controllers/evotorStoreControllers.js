const agent = require('superagent');
const pino = require('pino')();
const helperAuth = require('../lib/helperAuth');
const sendingNotifications = require('../lib/notification/sendingNotifications');
const sendErrorToAdmin = require('../lib/notification');
const BugHolder = require('../lib/BugHolder');

module.exports = {
  devices: function devices(request, reply) {
    const { hash, url } = helperAuth(request, reply);

    agent
      .put(`${url}/hs/evotor/devices`)
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

        sendingNotifications(
          response.body,
          request.auth.credentials,
          request.db.User,
          0,
        );

        pino.info(response.body);

        reply(response.body);
        return true;
      });
  },
  employees: function employees(request, reply) {
    const { hash, url } = helperAuth(request, reply);

    agent
      .put(`${url}/hs/evotor/employees`)
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

        sendingNotifications(
          response.body,
          request.auth.credentials,
          request.db.User,
          0,
        );

        pino.info(response.body);

        reply(response.body);
        return true;
      });
  },
  stores: function stores(request, reply) {
    const { hash, url } = helperAuth(request, reply);

    agent
      .put(`${url}/hs/evotor/stores`)
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

        sendingNotifications(
          response.body,
          request.auth.credentials,
          request.db.User,
          0,
        );

        pino.info(response.body);

        reply(response.body);
        return true;
      });
  },
};
