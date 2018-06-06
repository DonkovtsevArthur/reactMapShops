/**
 * Тест
 */

import { IHemeraPath, IHemeraRoute } from 'infrastructure/hemera';
import { IError } from 'infrastructure/Error';

export const path: IHemeraPath = {
  topic: 'goods',
  cmd: 'test',
};

export interface IParams {
  token: string;
}

export interface IResponse {
  error: IError | null;
  data?: any;
}

export abstract class Route implements IHemeraRoute {
  public path = path;
  public abstract handler(params: IParams): Promise<IResponse>;
}
