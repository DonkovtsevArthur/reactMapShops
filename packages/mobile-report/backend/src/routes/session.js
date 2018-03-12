const Joi = require('joi');
const session = require('../controllers/session');
const docs = require('../docs');

module.exports = [
  {
    method: 'GET',
    path: '/session/{storeUuid}',
    handler: session.getSession,
    config: {
      ...docs.getReceipt,
      auth: 'user',
      validate: {
        query: {
          interval: Joi.string().optional()
        }
      }
    }
  }
];
