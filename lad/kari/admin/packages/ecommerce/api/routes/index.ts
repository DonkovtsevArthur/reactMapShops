import * as Hapi from 'hapi';
import { goods } from '../hemera';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/test',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return 'ok';
    },
    options: {
      auth: 'test',
    },
  },

  {
    method: 'GET',
    path: '/user',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return request.auth.credentials;
    },
    options: {
      auth: 'user',
    },
  },

  {
    method: 'GET',
    path: '/goods',
    handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return await goods.test({
        token: 'tkn',
      });
    },
  },
];

export default routes;
