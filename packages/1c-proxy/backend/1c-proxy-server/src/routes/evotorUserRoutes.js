const Joi = require('joi');
const usersController = require('../controllers/evotorUsersControllers');
const failAction = require('../lib/failAction');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/user/create',
    handler: usersController.create,
    config: {
      auth: 'evotor',
      validate: {
        failAction,
        payload: {
          userId: Joi.string().required(),
          email: Joi.string().required(),
          phone: Joi.string().required(),
          inn: Joi.string().required(),
          token: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/subscription/event',
    handler: usersController.setTariff,
    config: {
      auth: 'evotor',
    },
  },
];
