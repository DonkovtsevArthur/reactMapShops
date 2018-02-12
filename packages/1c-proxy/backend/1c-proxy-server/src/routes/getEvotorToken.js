const getEvotorTokenController = require('../controllers/getEvotorTokenController');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/user/token',
    handler: getEvotorTokenController.get,
    config: {
      auth: 'evotor',
    },
  },
];
