const Joi = require('joi');
const settings = require('../controllers/settings');
const docs = require('../docs');

module.exports = [
  {
    method: 'POST',
    path: '/settings/fill',
    handler: settings.fillStore,
    config: {
      ...docs.settingsFillStore,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          evotorToken: Joi.string().required(),
          token: Joi.string().allow('').optional(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/settings/storeopen',
    handler: settings.storeOpen,
    config: {
      ...docs.storeOpen,
      auth: 'user',
      validate: {
        payload: {
          storeOpen: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: settings.settingsPage,
    config: {
      ...docs.settingsPage,
      validate: {
        query: {
          token: Joi.string(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/settings/delete',
    handler: settings.delete,
    config: {
      ...docs.delete,
      auth: 'application',
    },
  },
  {
    method: 'GET',
    path: '/public/{file*}',
    handler: {
      directory: {
        path: 'public',
      },
    },
  },
];
