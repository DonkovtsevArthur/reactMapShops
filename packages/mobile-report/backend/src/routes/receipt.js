const Joi = require('joi');
const receipt = require('../controllers/receipt');
const docs = require('../docs');

module.exports = [
  {
    method: 'GET',
    path: '/receipt/{storeUuid}',
    handler: receipt.getReceipt,
    config: {
      ...docs.getReceipt,
      auth: 'user',
      validate: {
        query: {
          interval: Joi.string().optional(),
          session: Joi.string().optional(),
        },
      },
    },
  },
];
