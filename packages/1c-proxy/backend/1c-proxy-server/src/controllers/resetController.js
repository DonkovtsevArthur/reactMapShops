const Seneca = require('seneca');
const pino = require('pino')();
const soap = require('soap-as-promised');

const notifier = Seneca().client({ host: 'notifier', port: 9001 });

function getCode() {
  let code = '';
  const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const maxPosition = words.length - 1;
  for (let i = 0; i < 5; i += 1) {
    const position = Math.floor(Math.random() * maxPosition);
    code += words.substring(position, position + 1);
  }
  return code;
}

module.exports = {
  async resetRequest(request, reply) {
    const oldCode = await request.db.ResetPassword.findOne({
      id: request.auth.credentials.id,
    });

    if (oldCode) {
      const remove = await request.db.ResetPassword.remove({
        id: request.auth.credentials.id,
      });

      if (!remove) {
        reply('Error').code(500);
        return;
      }
    }

    const code = getCode();

    const createNewRequest = await request.db.ResetPassword.create({
      confirmCode: code,
      id: request.auth.credentials.id,
    });

    if (!createNewRequest) {
      reply().code(500);
    }

    reply('Ok').code(200);

    notifier.act({
      method: 'email',
      email: request.auth.credentials.email,
      title: 'Запрос на сброс пароля на базу 1С Розница',
      message: `Для подтверждения сброса пароля введите проверочный код на странице настроек <br />
      <strong>Код для подтверждения:</strong> <span>${code}</span>` },
      (error) => {
        if (error) {
          pino.error(error);
          reply('Error').code(500);
          return false;
        }
        reply('Ok').code(200);
        return true;
      },
    );
  },

  async resetPassword(request, reply) {
    const code = await request.db.ResetPassword.findOne({
      id: request.auth.credentials.id,
    });

    pino.info(code);

    if (!code) {
      reply('Error').code(404);
      return;
    }


    if (code.confirmCode === request.payload.code) {
      try {
        pino.info('Reset password');
        const client = await soap.createClient(
          'https://ladcloud.ru/admincloud/ws/DBDistribution.1cws?wsdl',
          {
            wsdl_headers: {
              Authorization: 'Basic VXNlcjpiMzIzODZjNDNmZjU0ZTIwYmU4MDkwOTc4ZDA3OGM1Yw==',
            },
          },
        );
        client.addHttpHeader('Authorization', 'Basic VXNlcjpiMzIzODZjNDNmZjU0ZTIwYmU4MDkwOTc4ZDA3OGM1Yw==');

        const reset = await client.ResetPassword({
          АдресБазы: request.auth.credentials.url,
        });


        if (!reset) {
          reply('Ошибка сброса пароля').code(500);
          return;
        }

        await request.db.ResetPassword.remove({
          id: request.auth.credentials.id,
        });

        reply('Ок');
        return;
      } catch (error) {
        pino.error(error);
        reply(error).code(500);
      }
    } else {
      reply('Неверный код').code(400);
    }
  },
};

