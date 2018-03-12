import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as Pino from 'pino';
import routes from './routes';

const logger = Pino();

class DataSourceServer {
  private port: number;
  private server: Hapi.Server;
  constructor(port: number) {
    this.port = port || 5000;
  }
  public init() {
    try {
      this.server = new Hapi.Server({
        port: this.port,
        routes: {
          cors: { origin: ['*'] }
        }
      });
      this.server.route(routes);
      process.on('unhandledRejection', error => {
        logger.error(error);
        process.exit(1);
      });
    } catch (error) {
      logger.error('error init server', error);
    }
  }
  public async start() {
    await this.server.start();
    logger.info(`Server running at ${this.server.info.uri}`);
  }
}

export default DataSourceServer;
