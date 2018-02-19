const Joi = require('joi');
const graph = require('../controllers/graph');
const docs = require('../docs');

module.exports = [
  {
    method: 'GET',
    path: '/shop/graph',
    handler: graph.getPoints,
    config: {
      ...docs.getPoints,
      auth: 'user',
      validate: {
        query: {
          interval: Joi.string().optional(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/shop/{storeUuid}/graph',
    handler: graph.getPoints,
    config: {
      ...docs.getPointsSingleStore,
      auth: 'user',
      validate: {
        query: {
          interval: Joi.string().optional(),
        },
      },
    },
  },
];
