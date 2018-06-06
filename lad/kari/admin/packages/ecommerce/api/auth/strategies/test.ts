import * as Hapi from 'hapi';

export default function (server: Hapi.Server): void {
  server.auth.strategy('test', 'bearer-access-token', {
    validate: (req, token) => {
      const isValid = token === 'secret';
      return {
        isValid,
        credentials: { token },
      };
    },
  });
}
