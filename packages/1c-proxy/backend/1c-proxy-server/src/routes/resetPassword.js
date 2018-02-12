const Joi = require('joi');
const resetController = require('../controllers/resetController');


module.exports = [
  {
    method: 'GET',
    path: '/resetPasswordRequest',
    handler: resetController.resetRequest,
    config: {
      auth: 'lad',
    },
  },
  {
    method: 'POST',
    path: '/resetPassword',
    handler: resetController.resetPassword,
    config: {
      auth: 'lad',
      validate: {
        payload: {
          code: Joi.string().required(),
        },
      },
    },
  },
];
