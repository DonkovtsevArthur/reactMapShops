import { ErrorStatus, default as Error } from 'infrastructure/Error';
import { Route, IParams, IResponse } from './classes';
import * as Logger from 'pino';

const logger = Logger();

export default class Test extends Route {
  public async handler(params: IParams): Promise<IResponse> {
    try {
      const { token } = params;

      return {
        data: {
          token,
          date: new Date(),
        },
        error: null,
      };
    } catch (err) {
      logger.error(err.message);
      return {
        error: {
          status: err.status || ErrorStatus.internalServerError,
          message: err.message,
        },
      };
    }
  }
}
