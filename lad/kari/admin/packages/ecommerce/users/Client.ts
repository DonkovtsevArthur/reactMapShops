import BaseHemeraClient from 'infrastructure/BaseHemeraClient';

import {
  path as authPath,
  IParams as authParams,
  IResponse as authResponse,
} from './hemeraRoutes/AuthUser/classes';

export default class Client extends BaseHemeraClient {
  public async auth(params: authParams): Promise<authResponse> {
    return await this.act(authPath, params);
  }
}
