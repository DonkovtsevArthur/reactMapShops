const Seneca = require('seneca');

const notifier = Seneca().client({ host: 'notifier', port: 9001 });
const pino = require('pino')();

function getCode() {
  const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const maxPosition = words.length - 1;
  let code = '';

  for (let i = 0; i < 5; i += 1) {
    const position = Math.floor(Math.random() * maxPosition);
    code += words.substring(position, position + 1);
  }
  return code;
}

module.exports = {
  getCode: async function code(request, reply) {
    const newEmail = await request.db.NewEmailRequest.findOne({
      id: request.auth.credentials.id,
    });

    if (newEmail) {
      const remove = await request.db.NewEmailRequest.remove({
        id: request.auth.credentials.id,
      });
      if (!remove) {
        reply('Error').code(500);
        return;
      }
    }

    const confirmCode = getCode();

    const createNewRequest = await request.db.NewEmailRequest.create({
      confirmCode,
      newEmail: request.payload.newEmail,
      id: request.auth.credentials.id,
    });

    pino.info(createNewRequest);

    notifier.act({
      method: 'email',
      email: request.payload.newEmail,
      title: 'Запрос на изменение почты',
      message: `Для подтверждения изменения почты введите проверочный код на
                странице настроек <br />
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

  verifyCode: async function verifyCode(request, reply) {
    const newEmail = await request.db.NewEmailRequest.findOne({
      id: request.auth.credentials.id,
    });

    pino.info(newEmail);

    if (!newEmail) {
      reply('Error').code(404);
      return false;
    }

    if (newEmail.confirmCode === request.payload.code) {
      try {
        const user = await request.db.User.findById(request.auth.credentials.id);
        if (!user) throw new Error('Error');

        user.email = newEmail.newEmail;

        const save = await user.save(user);
        if (!save) throw new Error('Error');

        const remove = await request.db.NewEmailRequest.remove({
          id: request.auth.credentials.id,
        });
        if (!remove) throw new Error('Error');

        reply(save.email).code(200);
        return true;
      } catch (error) {
        pino.error(error);
        reply(error).code(500);
        return false;
      }
    }
    reply('Неверный код').code(400);
    return false;
  },
};
