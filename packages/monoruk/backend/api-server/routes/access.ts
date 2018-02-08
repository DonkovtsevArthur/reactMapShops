
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import access from '../controller/access';
import { ACCESS_VALID_TYPE } from '../../interfaces/constants';

const userRoutes:Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/access/share',
    handler: access.share,
    config: {
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          apps: Joi.array().items(Joi.object().keys({
            appId: Joi.string().required(),
            appType: Joi.string().valid(ACCESS_VALID_TYPE).required(),
          })), 
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/access/openShare',
    handler: access.openShare,
    config: {
      auth: 'application',
      validate: {
        payload: {
          accessToken: Joi.string().required(),
          orgId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/access/closeShare',
    handler: access.closeShare,
    config: {
      auth: 'application',
      validate: {
        payload: {
          accessToken: Joi.string().required(),
          orgId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/access/removeShare',
    handler: access.removeShare,
    config: {
      auth: 'application',
      validate: {
        payload: {
          accessToken: Joi.string().required(),
          orgId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/access/getShareToApp',
    handler: access.getShareToApp,
    config: {
      auth: 'application',
      validate: {
        payload: {
          appId: Joi.string().required(),
          orgId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/access/copy',
    handler: access.copy, 
    config: {
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          accessToken: Joi.string().required(),
          alias: Joi.string().required(),
          group: Joi.string().required(),
        },
      },
    },
  },
];

export default userRoutes;
