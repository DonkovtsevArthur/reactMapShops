
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import widget from '../controller/widget';
import { HemeraClient } from '../../interfaces/core';
import { INDEX_ACTIONS, PERIOD } from '../../interfaces/constants';

const widgetRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'GET',
    path: '/widget/{appId}',
    handler: widget.get,
    config: {
      auth: 'application',
    },
  },
  {
    method: 'POST',
    path: '/widget/update',
    handler: widget.update,
    config: {
      auth: 'application',
      validate: {
        payload: {
          appId: Joi.string().required(),
          index: Joi.string().allow('').optional(),
          section: Joi.string().allow('').optional(),
          graph: Joi.string().allow('').required(),
          group: Joi.string().allow('').required(),
          indexAction: Joi.string().valid(INDEX_ACTIONS).required(),
          secondIndexAction: Joi.string().valid(INDEX_ACTIONS).optional(),
          dateStart: Joi.date().optional(),
          dateEnd: Joi.date().optional(),
          color: Joi.string().optional(),
          period: Joi.string().valid(PERIOD).optional(),
          formula: Joi.array().items(Joi.string()).optional(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/widget/{appId}/events',
    handler: widget.events,
  },
];

export default widgetRoutes;

