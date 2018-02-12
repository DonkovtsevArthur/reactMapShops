const Joi = require('joi');
const changeEmailController = require('../controllers/changeEmailController');


module.exports = [
  {
    method: 'POST',
    path: '/setnewemail',
    handler: changeEmailController.getCode,
    config: {
      auth: 'lad',
      validate: {
        payload: {
          newEmail: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/verifycode',
    handler: changeEmailController.verifyCode,
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
