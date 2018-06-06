import BaseHemeraClient from 'infrastructure/BaseHemeraClient';

import {
  path as testPath,
  IParams as testParams,
  IResponse as testResponse,
} from './hemeraRoutes/Test/classes';

export default class Client extends BaseHemeraClient {
  public async test(params: testParams): Promise<testResponse> {
    return await this.act(testPath, params);
  }
}
