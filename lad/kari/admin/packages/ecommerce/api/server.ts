import * as Hapi from 'hapi';
import * as AuthBearer from 'hapi-auth-bearer-token';

import routes from './routes';
import { default as makeAuth } from './auth';

class Server {
  constructor(private port: string) {}

  public async start() {
    try {
      const server = new Hapi.Server(<Hapi.ServerOptions>{
        port: this.port,
        routes: {
          cors: true,
        },
      });

      await server.register([AuthBearer]);

      makeAuth(server);
      server.route(routes);
      await server.start();
      console.log('Server running at:', server.info!.uri);
    } catch (err) {
      console.error(err);
    }
  }
}

const server = new Server(<string>process.env.PORT || '5000');
server.start();

process.on('unhandledRejection', error => {
  console.error(error.message);
  console.error(error.stack);
});
