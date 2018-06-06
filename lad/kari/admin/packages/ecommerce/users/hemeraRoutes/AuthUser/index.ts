import { ErrorStatus, default as Error } from 'infrastructure/Error';
import { Route, IParams, IResponse } from './classes';
import * as Logger from 'pino';

const logger = Logger();

export default class AuthUser extends Route {
  public async handler(params: IParams): Promise<IResponse> {
    try {
      const { token } = params;
      let user: any = null;
      if (token === 'usertoken') {
        user = {
          name: 'Vasya',
          token: 'usertoken',
        };
      }

      if (!user) {
        throw new Error({
          status: ErrorStatus.unauthorized,
          message: 'Invalid token passed',
        });
      }

      return {
        user,
        error: null,
      };
    } catch (err) {
      logger.error(err.message);
      return {
        error: {
          status: err.status || ErrorStatus.internalServerError,
          message: err.message,
        },
        user: null,
      };
    }
  }
}
