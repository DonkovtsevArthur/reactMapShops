const storeController = require('../controllers/evotorStoreControllers');

module.exports = [
  {
    method: 'PUT',
    path: '/api/v1/inventories/devices',
    handler: storeController.devices,
    config: {
      auth: 'lad',
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/employees',
    handler: storeController.employees,
    config: {
      auth: 'lad',
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/inventories/stores',
    handler: storeController.stores,
    config: {
      auth: 'lad',
    },
  },
];
