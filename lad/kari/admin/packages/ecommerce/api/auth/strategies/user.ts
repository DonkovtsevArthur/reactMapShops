import * as Hapi from 'hapi';
import { users } from '../../hemera';

export default function (server: Hapi.Server): void {
  server.auth.strategy('user', 'bearer-access-token', {
    validate: async (req, token) => {
      const response = await users.auth({
        token,
      });

      if (response.error) {
        return {
          isValid: false,
          credentials: {  token },
        };
      }

      return {
        isValid: true,
        credentials: response.user,
      };
    },
  });
}
