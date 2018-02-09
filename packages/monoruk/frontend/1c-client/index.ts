import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import * as Logger from 'pino';

// routes
import routes from './routes';

const logger = Logger();

export interface ServerConfiguration {
  port: string;
  visionConfig: Vision.ServerViewsConfiguration;
  registerModules: Array<Hapi.PluginFunction<{}>>;
}

export default class Server {
  private config: ServerConfiguration;
  constructor(configLoc: ServerConfiguration) {
    this.config = configLoc;
  }
  start() {
    try {
      const server = new Hapi.Server();
      server.connection({ port: this.config.port, routes: { cors: true } });
      server.register(this.config.registerModules, async () => {
        server.views(this.config.visionConfig);
        server.route(routes);
        await server.start();
        logger.info('Server running at:', server.info ? server.info.uri : '');
      });
    } catch (error) {
      logger.error(error);
    }
  }
}

const config: ServerConfiguration = {
  port: process.env.PORT || '7000',
  visionConfig: {
    engines: { html: Handlebars as any },
    path: path.resolve(__dirname, './public')
  },
  registerModules: [Inert, Vision as any]
};

const frontServer = new Server(config);
frontServer.start();
