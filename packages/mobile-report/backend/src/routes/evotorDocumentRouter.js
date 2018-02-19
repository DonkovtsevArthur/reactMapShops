const Joi = require('joi');
const documentsController = require('../controllers/evotorDocumentsControllers');
const docs = require('../docs');

module.exports = [
  {
    method: 'PUT',
    path: '/api/v1/inventories/stores/{storeUuid}/documents',
    handler: documentsController.documents,
    config: {
      ...docs.putDocuments,
      auth: 'personal',
      validate: {
        payload: Joi.array().items(Joi.object()).required(),
      },
    },
  },
  {
    method: 'GET',
    path: '/documents',
    handler: documentsController.getDocuments,
    config: {
      ...docs.getDocuments,
      auth: 'application',
    },
  },
];
