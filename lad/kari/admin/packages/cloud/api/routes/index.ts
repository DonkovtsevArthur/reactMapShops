import * as Hapi from 'hapi';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/test',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return 'Work!';
    }
  }
];

export default routes;
