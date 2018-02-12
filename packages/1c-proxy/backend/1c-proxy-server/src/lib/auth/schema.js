/**
Схема авторизации bearer-token-evotor,

Стратегия на основе этой схемы определяется так:
server.auth.strategy('strategyName', 'bearer-token-evotor', {
    validate: function (token, callback) {
        //Основная функция валидации токена
        ...
        callback(err, credentials)
    },
    errorData: function (err) {
        //необязательная подготовка данных к выводу при ошибке
        ...
        return {
            error: err
        }
    },
    errorReply: function(reply, error) {
        //необязательная функция для переопределения ошибок, заголовков и т.д. в reply при ошибке
    }
});

Ошибки по умолчанию, передаваемые в errorData:
- 'no Authorization header',
- 'Authorization is not Bearer'
**/


const Hoek = require('hoek');

const defaults = {
  validate: function validate(header, callback) {
    callback(true, 1);
  },
  errorData: function errorData(err) {
    return {
      errors: [
        { code: 1001, message: err },
      ],
    };
  },
  errorReply: function errorReply(reply, err) {
    return reply(err).code(401);
  },
};

module.exports = function returnCredentials(server, options) {
  const settings = Hoek.applyToDefaults(defaults, options);
  const ret = {
    authenticate: (request, reply) => {
      const authorization = request.raw.req.headers.authorization;

      if (!authorization) {
        return settings.errorReply(
          reply,
          settings.errorData('no Authorization header'));
      }

      const parts = authorization.split(/\s+/);

      if (parts[0] !== 'Bearer') {
        return settings.errorReply(
          reply,
          settings.errorData('Authorization is not Bearer'),
        );
      }

      settings.validate.call(request, parts[1], (err, credentials = {}) => {
        if (err) {
          return settings.errorReply(
            reply,
            settings.errorData(err, credentials),
          );
        }
        return reply.continue({ credentials });
      });
      return false;
    },
  };

  return ret;
};
