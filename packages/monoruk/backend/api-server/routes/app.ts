
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import app from '../controller/app';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import {
  getAppDoc,
  getAllAppDoc,
  addAppDoc,
  updateAppDoc,
  deleteAppDoc,
  setStatusDoc,
} from '../docs';
import {
  VALID_TYPE,
  VALID_STATUS,
  VALID_APPS_TYPE,
  VALID_PERIOD,
  VALID_BUSINESS_TYPE,
  DATA_SOURCE,
  WIDGET,
} from '../../interfaces/constants';

const appRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/app/get',
    handler: app.get,
    config: {
      ...getAppDoc,
      auth: 'developUser',
      validate: {
        payload: {
          name: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/app/getAll',
    handler: app.getAll,
    config: {
      ...getAllAppDoc,
      auth: 'application',
    },
  },
  {
    method: 'POST',
    path: '/app/add',
    handler: app.add,
    config: {
      ...addAppDoc,
      auth: 'developUser',
      validate: {
        payload: {
          name: Joi.string().required(),
          type: Joi.string().valid(VALID_APPS_TYPE).required(),
          alias: Joi.string().required(),
          groups: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            alias: Joi.string().required(),
            period: Joi.string().valid(VALID_PERIOD).required(),
            items: Joi.array().items(Joi.object().keys({
              name: Joi.string().required(),
              alias: Joi.string().required(),
              type: Joi.string().valid(VALID_TYPE).required(),
              businessType: Joi.string().valid(VALID_BUSINESS_TYPE).required(),
              system: Joi.boolean().required(),
              needDirectory: Joi.boolean().required(),
            })),
            extras: Joi.object(),
          })).when('type', {
            is: DATA_SOURCE,
            then: Joi.any().required(),
            otherwise: Joi.any().optional(),
          }),
          settings: Joi.object().when('type', {
            is: WIDGET,
            then: Joi.any().required(),
            otherwise: Joi.any().optional(),
          }),
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/app/update',
    handler: app.update,
    config: {
      ...updateAppDoc,
      auth: 'developUser',
      validate: {
        payload: {
          name: Joi.string().required(),
          type: Joi.string().valid(VALID_APPS_TYPE).required(),
          alias: Joi.string().required(),
          groups: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            alias: Joi.string().required(),
            period: Joi.string().valid(VALID_PERIOD).required(),
            items: Joi.array().items(Joi.object().keys({
              name: Joi.string().required(),
              alias: Joi.string().required(),
              type: Joi.string().valid(VALID_TYPE).required(),
              businessType: Joi.string().valid(VALID_BUSINESS_TYPE).required(),
              system: Joi.boolean().required(),
              needDirectory: Joi.boolean().required(),
            })),
            extras: Joi.object(),
          })).when('type', {
            is: DATA_SOURCE,
            then: Joi.any().required(),
            otherwise: Joi.any().optional(),
          }),
          settings: Joi.object().when('type', {
            is: WIDGET,
            then: Joi.any().required(),
            otherwise: Joi.any().optional(),
          }),
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/app/remove',
    handler: app.remove,
    config: {
      ...deleteAppDoc,
      auth: 'developUser',
      validate: {
        payload: {
          name: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/app/status',
    handler: app.status,
    config: {
      ...setStatusDoc,
      auth: 'application',
      validate: {
        payload: {
          name: Joi.string().required(),
          developId: Joi.string().required(),
          status: Joi.string().valid(VALID_STATUS).required(),
        },
      },
    },
  },
];

export default appRoutes;

