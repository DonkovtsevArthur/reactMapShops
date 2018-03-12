const Joi = require('joi');
const userDataController = require('../controllers/evotorUserDataControllers');
const docs = require('../docs');

module.exports = [
  {
    method: 'POST',
    path: '/user/create',
    handler: userDataController.create,
    config: {
      ...docs.createUser,
      auth: 'application',
      validate: {
        payload: {
          uuid: Joi.string().required(),
          token: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/user/status',
    handler: userDataController.status,
    config: {
      ...docs.statusUser,
      auth: 'application',
      validate: {
        payload: {
          uuid: Joi.string().required(),
          active: Joi.bool().required(),
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/devices',
    handler: userDataController.devices,
    config: {
      ...docs.putDevices,
      auth: 'personal',
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/employees',
    handler: userDataController.employees,
    config: {
      ...docs.putEmployees,
      auth: 'personal',
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/stores',
    handler: userDataController.stores,
    config: {
      ...docs.putStores,
      auth: 'personal',
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
];
