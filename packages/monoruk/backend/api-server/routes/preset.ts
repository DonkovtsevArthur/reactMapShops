
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import * as preset from '../controller/preset';
import { runPreset } from '../docs';

const userRoutes:Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/preset/{preset}',
    handler: preset.start,
    config: {
      ...runPreset,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          datasourceId: Joi.string().required(),
          token: Joi.string().optional(),
        },
      },
    },
  },
];

export default userRoutes;
