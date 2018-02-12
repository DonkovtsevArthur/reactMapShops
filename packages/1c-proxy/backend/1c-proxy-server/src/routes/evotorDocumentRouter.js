const documentsController = require('../controllers/evotorDocumentsControllers');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/inventories/stores/{storeUuid}/products',
    handler: documentsController.getProducts,
    config: {
      auth: 'lad',
    },
  },
  {
    method: 'POST',
    path: '/api/v1/inventories/stores/{storeUuid}/products',
    handler: documentsController.pushProducts,
    config: {
      auth: 'lad',
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/stores/{storeUuid}/documents',
    handler: documentsController.documents,
    config: {
      auth: 'lad',
    },
  },
];
