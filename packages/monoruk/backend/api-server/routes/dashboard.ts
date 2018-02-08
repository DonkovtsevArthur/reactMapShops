
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import * as dashboard from '../controller/dashboard';
import {
  addDashboardDoc,
  getAllDashboardDoc,
  getDashboardDoc,
  placeDashboardDoc,
} from '../docs';

const dashboardRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/dashboard/add',
    handler: dashboard.add,
    config: {
      ...addDashboardDoc,
      auth: 'application',
      validate: {
        payload: {
          orgId: Joi.string().required(),
          alias: Joi.string().required(),
          group: Joi.string().optional(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/dashboard/getAll',
    handler: dashboard.getAll,
    config: {
      ...getAllDashboardDoc,
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
    path: '/dashboard/get',
    handler: dashboard.get,
    config: {
      ...getDashboardDoc,
      auth: 'application',
      validate: {
        payload: {
          dashboardId: Joi.string().required(),
          orgId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/dashboard/remove',
    handler: dashboard.remove,
    config: {
      ...getDashboardDoc,
      auth: 'application',
      validate: {
        payload: {
          dashboardId: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/dashboard/place',
    handler: dashboard.place,
    config: {
      ...placeDashboardDoc,
      auth: 'application',
      validate: {
        payload: {
          place: Joi.array().items(Joi.object().keys({
            i: Joi.string().required(),
            w: Joi.number().required(),
            h: Joi.number().required(),
            y: Joi.number().required(),
            x: Joi.number().required(),
            isDraggable: Joi.any(),
            isResizable: Joi.any(),
            maxH: Joi.any(),
            maxW: Joi.any(),
            minH: Joi.any(),
            minW: Joi.any(),
            moved: Joi.any(),
            static: Joi.any(),
          })),
        },
      },
    },
  },
];

export default dashboardRoutes;
