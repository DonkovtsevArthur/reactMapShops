
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import * as user from '../controller/user';
import { addLkUser, changeStatus } from '../docs';

const userRoutes:Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/user/add',
    handler: user.add,
    config: {
      ...addLkUser,
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
    path: '/user/changeStatus',
    handler: user.changeStatus,
    config: {
      ...changeStatus,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          status: Joi.string().required(),
        },
      },
    },
  },
];

export default userRoutes;
