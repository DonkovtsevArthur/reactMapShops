const Joi = require('joi');
const documentsController = require('../controllers/evotorDocumentsControllers');

module.exports = [
  {
    method: 'PUT',
    path: '/api/v1/inventories/stores/{storeUuid}/documents',
    handler: documentsController.documents,
    config: {
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
];
