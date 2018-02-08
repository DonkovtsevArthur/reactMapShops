
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import * as clickhouse from '../controller/clickhouse';
import { dataClickhouse, getDataClickhouse } from '../docs';

const clickhouseRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'POST',
    path: '/data',
    handler: clickhouse.data,
    config: {
      ...dataClickhouse,
      auth: 'lkUserWrite',
    },
  },
  {
    method: 'POST',
    path: '/data/get',
    handler: clickhouse.getData,
    config: {
      ...getDataClickhouse,
      auth: 'lkUserRead',
      validate: {
        payload: {
          query: Joi.string().required(),
        },
      },
    },
  },
];

export default clickhouseRoutes;

