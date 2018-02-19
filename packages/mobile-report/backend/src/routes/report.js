const Joi = require('joi');
const report = require('../controllers/report');
const docs = require('../docs');

module.exports = [
  {
    method: 'GET',
    path: '/shop',
    handler: report.getShop,
    config: {
      ...docs.getShop,
      auth: 'user',
      validate: {
        query: {
          interval: Joi.string().optional(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/shop/{storeUuid}/data',
    handler: report.getSingleShop,
    config: {
      ...docs.getSingleShop,
      auth: 'user',
      validate: {
        query: {
          interval: Joi.string().optional(),
        },
        params: {
          storeUuid: Joi.string().required(),
        },
      },
    },
  },
];
