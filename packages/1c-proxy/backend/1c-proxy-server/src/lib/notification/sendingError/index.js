const Seneca = require('seneca');
const pino = require('pino')();

const notifier = Seneca().client({ host: 'notifier', port: 9001 });

const sendError = function sendNotification(errorMessage, user) {
  const { email } = user;

  notifier.act({
    email,
    method: 'email',
    title: 'Сообщение',
    message: `Произошла серьезная ошибка: ${errorMessage}`,
  },
    (error) => {
      if (error) {
        pino.error(error);
      }
      return null;
    },
  );
};

module.exports = sendError;
