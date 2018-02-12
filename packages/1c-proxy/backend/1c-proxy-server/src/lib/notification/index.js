const Seneca = require('seneca');
const logger = require('pino')();

const notifier = Seneca().client({ host: 'notifier', port: 9001 });

function sendErrorToAdmin(request, error, urlToBase) {
  notifier.act({
    email: ['golovkoam@lad24.ru', 'chernyshovasn@lad24.ru', 'kuchinsn@lad24.ru'],
    method: 'email',
    title: 'ВНИМАНИЕ! Произошла ошибка в работе 1С Розница',
    message: `
    <p>
    <strong>База: </strong> ${urlToBase}
    </p>
    <p>
    <strong>Заголовки: </strong> ${JSON.stringify(request.headers)}
    </p>
    <p>
    <strong>Ошибка: </strong> ${error}
    </p>
    <p>
    <strong>payload: </strong> ${JSON.stringify(request.payload)}
    </p>
    `,
  },
    (err) => {
      if (err) {
        logger.error(err);
      }
      return null;
    },
  );
}

module.exports = sendErrorToAdmin;
