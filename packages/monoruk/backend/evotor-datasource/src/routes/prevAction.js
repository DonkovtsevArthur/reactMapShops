const Joi = require('joi');
const prev = require('../controllers/prev');

module.exports = [
  {
    method: 'POST',
    path: '/datasource/loadPrevData',
    handler: prev.load,
    config: {
      auth: 'integration',
      validate: {
        payload: {
          orgId: Joi.string().optional(),
          token: Joi.string().required(),
          evotorToken: Joi.string().required(),
        },
      },
    },
  },
];
