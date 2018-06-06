import * as Hapi from 'hapi';
import * as Pino from 'pino';
import routes from './routes';

const logger = Pino();

class TestServer {
  private port: number;
  private _server: Hapi.Server;
  constructor(port: number = 5000) {
    this.port = port;
  }
  public init() {
    try {
      process.on('unhandledRejection', error => {
        logger.error(error);
        process.exit(1);
      });
      this._server = new Hapi.Server({
        port: this.port,
        routes: {
          cors: { origin: ['*'] }
        }
      });
      this._server.route(routes);
    } catch (error) {
      logger.error(`Error init server ${error}`);
    }
  }
  public async start() {
    await this._server.start();
    logger.info(`Server running at ${this.server.info.uri}`);
  }
  get server() {
    return this._server;
  }
}

export default TestServer;
