/**
 * Авторизация пользователя в системе
 * В ответ возвращается credentials пользователя или null
 */

import { IHemeraPath, IHemeraRoute } from 'infrastructure/hemera';
import { IError } from 'infrastructure/Error';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'auth',
};

export interface IParams {
  token: string;
}

export interface IResponse {
  error: IError | null;
  user: any | null;
}

export abstract class Route implements IHemeraRoute {
  public path = path;
  public abstract handler(params: IParams): Promise<IResponse>;
}
