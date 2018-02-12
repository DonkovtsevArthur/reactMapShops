const settingsController = require('../controllers/settingsController');

module.exports = [
  {
    method: 'GET',
    path: '/settings',
    handler: settingsController,
  },
];
