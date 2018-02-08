
import * as Joi from 'joi';
import * as Hapi from 'hapi';

import dictionary from '../controller/dictionary';

const appRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'PUT',
    path: '/dictionary/{dictionary}',
    handler: dictionary.save,
    config: {
      auth: 'lkUserWrite',
      validate: {
        payload: Joi.array().items(Joi.object().keys({
          id: Joi.string().required(),
          value: Joi.string().required(),
        })).required(),
      },
    },
  },
];

export default appRoutes;

