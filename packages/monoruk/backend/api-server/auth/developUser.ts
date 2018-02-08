import { JwtDevelopUserToken } from '../../interfaces/core';

export default (decoded: JwtDevelopUserToken, request, callback: Function) => {
  return callback(null, true, decoded);
};

