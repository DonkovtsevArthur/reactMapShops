const ladController = require('./ladUserController');
const Seneca = require('seneca');
const pino = require('pino')();
const emailTemplate = require('../tpl/newUserEmail');

const notifier = Seneca().client({ host: 'notifier', port: 9001 });

module.exports = {
  create: async function create(request, reply) {
    pino.info('Creating user from evotor', request.payload);
    const user = await request.db.User.findOne({
      $or: [
        {
          evotorUuid: request.payload.userId,
        },
      ],
    });

    if (user) {
      reply({
        errors: [
          {
            code: 2005,
          },
        ],
      }).code(409);
      return false;
    }
    try {
      const newBase = await ladController.create(request.payload.userId);
      if (newBase.status === 'success') {
        await request.db.User.create({
          evotorUuid: request.payload.userId,
          email: request.payload.email,
          phone: request.payload.phone,
          inn: request.payload.inn,
          token: request.payload.token,
          tariffActive: true,
          urlToBase: newBase.data.url,
          userBase: newBase.data.user,
          passwordBase: newBase.data.password,
          urlToBaseTrade: newBase.data.urlTrade,
          userBaseTrade: newBase.data.userTrade,
          passwordBaseTrade: newBase.data.passwordTrade,
        });
        reply();
      } else {
        reply('Error').code(400);
        return false;
      }
    } catch (err) {
      pino.error(err.code);
      pino.error(err);
      pino.error(err.stack);
      reply('Error').code(400);
      return false;
    }
    return false;
  },

  async setTariff(request, reply) {
    pino.info('Setting tariff from evotor', request.payload);

    try {
      const evotorUuid = request.payload.userId;
      const planId = request.payload.planId;
      const type = request.payload.type;

      const user = await request.db.User.findOne({ evotorUuid });

      if (!user) {
        pino.error('Пользователь не найден');
        reply('User not found').code(400);
        return false;
      }
      reply();

      switch (type) {
        case 'SubscriptionCreated':
        case 'SubscriptionTermsChanged':
          await user.update({ $set: { tariffId: planId, tariffActive: true } });
          notifier.act({
            method: 'email',
            email: user.email,
            title: 'Вас приветствует группа компаний «ЛАД»!',
            message: emailTemplate(user.urlToBase, user.urlToBaseTrade),
          },
            (error) => {
              if (error) {
                pino.error(error);
                reply('Error').code(500);
                return false;
              }

              notifier.act({
                method: 'email',
                email: ['smyshlyaevaaa@lad24.ru', 'pavlovda@lad24.ru', 'baranovaov@lad24.ru'],
                title: 'Новый пользователь в системе ladcloud',
                message: `
              <strong>Почта пользователя:
              </strong><span>${user.email}</span><br />
              <strong>Телефон пользователя:
              </strong><span>${user.phone || 'Не указан'}</span><br />
              <strong>ИНН пользователя:
              </strong><span>${user.inn}</span><br />
              <strong>Путь к базе: </strong><span>${user.urlToBase}</span>
          `,
              },
                (errorSend) => {
                  if (errorSend) {
                    pino.error(errorSend);
                    return false;
                  }
                  return true;
                });
              return true;
            });
          return true;
        case 'SubscriptionTerminated':
          await user.update({ $set: { tariffActive: false } });
          notifier.act({
            method: 'email',
            email: ['smyshlyaevaaa@lad24.ru', 'pavlovda@lad24.ru', 'baranovaov@lad24.ru'],
            title: 'Деактивация пользователя в системе ladcloud 1С розница',
            message: `
          <strong>Почта пользователя:
          </strong><span>${user.email}</span><br />
          <strong>Телефон пользователя:
          </strong><span>${user.phone || 'Не указан'}</span><br />
          <strong>ИНН пользователя:
          </strong><span>${user.inn}</span><br />
          <strong>Путь к базе: </strong><span>${user.urlToBase}</span>
      `,
          },
            (errorSend) => {
              if (errorSend) {
                pino.error(errorSend);
                return false;
              }
              return true;
            });
          return true;
        default:
          reply();
          return true;
      }
    } catch (error) {
      reply();
      pino.error('Error billing user', error);
    }
    return true;
  },
};
