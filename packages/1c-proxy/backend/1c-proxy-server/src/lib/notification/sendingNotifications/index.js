const hash = require('object-hash');
const Seneca = require('seneca');
const moment = require('moment');
const pino = require('pino')();
const notificationChunk = require('../../../tpl/notificationChunk');
const notificationEmail = require('../../../tpl/notificationEmail');
const notificationEmailDocuments = require('../../../tpl/notificationEmailDocuments');

const notifier = Seneca().client({ host: 'notifier', port: 9001 });

// Функция генерации сообщения перед отправкой
const createMessage = function createMessage(wrongDocuments, user, requestType) {
  let emailBody = '';
  let mailType = 'shortEmail';
  wrongDocuments.forEach((item) => {
    if (item.errorCode === '06') {
      mailType = 'longEmail';
    }
    emailBody += notificationChunk(item, user, requestType);
  });
  if (mailType === 'longEmail') return notificationEmailDocuments(emailBody);
  return notificationEmail(emailBody);
};

// Функция проверки необходимости отправки сообщений клиенту
const sendNotification = function sendNotification(wrongDocuments, user, db, requestType) {
  if (wrongDocuments.length > 0 && wrongDocuments[0].errorCode) {
    const { message, messageDate, email, evotorUuid } = user;
    const wrongDocumentsHash = hash(wrongDocuments);
    const date = new Date();
    const otherMessage = message !== wrongDocumentsHash;
    const oldMessage = moment(date).diff(moment(messageDate), 'h') > 22;
    const outOfDate = oldMessage || otherMessage;

    if (!message || (message && outOfDate)) {
      db.update({ evotorUuid }, { $set: {
        message: wrongDocumentsHash,
        messageDate: date,
      } }).catch(error => pino.error(error));

      notifier.act({
        email,
        method: 'email',
        title: 'ВНИМАНИЕ! Произошла ошибка в работе 1С Розница',
        message: createMessage(wrongDocuments, user, requestType),
      },
        (error) => {
          if (error) {
            pino.error(error);
          }
          return null;
        },
      );
    }
  }
};

module.exports = sendNotification;
