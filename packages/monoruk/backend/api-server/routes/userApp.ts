
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import * as userApp from '../controller/userApp';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import {
  addDataSourceDoc,
  removeDataSourceDoc,
  setStatusUserAppDoc,
  getUserAppDoc,
  putUserAppDoc,
  getAllDataSourceDoc,
  addWidgetpDoc,
  removeWidgetDoc,
  getUserConfigDoc,
  getUserTokenDoc,
} from '../docs';
import {
  VALID_STATUS,
  VALID_APPS_TYPE,
  VALID_TYPE,
  VALID_BUSINESS_TYPE,
} from '../../interfaces/constants';

const userAppRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/userApp/addDataSource',
    handler: userApp.addDataSource,
    config: {
      ...addDataSourceDoc,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          appId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/userApp/removeDataSource',
    handler: userApp.removeDataSource,
    config: {
      ...removeDataSourceDoc,
      auth: 'application',
      validate: {
        payload: {
          appId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/userApp/getAllDataSource',
    handler: userApp.getAllDataSource,
    config: {
      ...getAllDataSourceDoc,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/userApp/addWidget',
    handler: userApp.addWidget,
    config: {
      ...addWidgetpDoc,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          appId: Joi.string().required(),
          dataSourceId: Joi.string().required(),
          place: {
            x: Joi.number().required(),
            y: Joi.number().required(),
          },
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/userApp/removeWidget',
    handler: userApp.removeWidget,
    config: {
      ...removeWidgetDoc,
      auth: 'application',
      validate: {
        payload: {
          appId: Joi.string().required(),
          dashboardId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/userApp/setStatus',
    handler: userApp.setStatusUserApp,
    config: {
      ...setStatusUserAppDoc,
      auth: 'application',
      validate: {
        payload: {
          appId: Joi.string().required(),
          status: Joi.string().valid(VALID_STATUS).required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/userApp/getConfig',
    handler: userApp.getConfig,
    config: {
      ...getUserConfigDoc,
      auth: 'lkUserRead',
    },
  },
  {
    method: 'POST',
    path: '/userApp/get',
    handler: userApp.get,
    config: {
      ...getUserAppDoc,
      auth: 'application',
      validate: {
        payload: {
          appId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/userApp/getUserToken',
    handler: userApp.getUserToken,
    config: {
      ...getUserTokenDoc,
      auth: 'application',
      validate: {
        payload: {
          appId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/userApp/put',
    handler: userApp.put,
    config: {
      ...putUserAppDoc,
      auth: 'application',
      validate: {
        payload: Joi.array().items(Joi.object().keys({
          name: Joi.string().required(),
          alias: Joi.string().required(),
          period: Joi.string().required(),
          items: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            alias: Joi.string().required(),
            type: Joi.string().valid(VALID_TYPE).required(),
            businessType: Joi.string().valid(VALID_BUSINESS_TYPE).required(),
          })),
          extras: Joi.object(),
        })),
      },
    },
  },
  {
    method: 'POST',
    path: '/userApp/copy',
    handler: userApp.copy,
    config: {
      ...getUserTokenDoc,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          appId: Joi.string().required(),
        },
      },
    },
  },
];

export default userAppRoutes;




