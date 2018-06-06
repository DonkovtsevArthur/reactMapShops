import * as Hapi from 'hapi';
import test from './strategies/test';
import user from './strategies/user';

export default function (server: Hapi.Server): void {
  test(server);
  user(server);
}
