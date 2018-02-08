
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import * as develop from '../controller/develop';
import { addAdminUser, loginAdminUser  } from '../docs';

const developerRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/develop/add',
    handler: develop.add,
    config: {
      ...addAdminUser,
      auth: 'application',
      validate: {
        payload: {
          login: Joi.string().required(),
          password: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/develop/login',
    handler: develop.login,
    config: {
      ...loginAdminUser,
      validate: {
        payload: {
          login: Joi.string().required(),
          password: Joi.string().required(),
        },
      },
    },
  },
];

export default developerRoutes;
