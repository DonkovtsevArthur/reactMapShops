const Joi = require('joi');
const dictionary = require('../controllers/dictionary');

module.exports = [
  {
    method: 'PUT',
    path: '/api/v1/inventories/stores',
    handler: dictionary.stores,
    config: {
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/devices',
    handler: dictionary.devices,
    config: {
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/employees',
    handler: dictionary.employees,
    config: {
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
];
