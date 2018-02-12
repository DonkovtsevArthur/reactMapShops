const mongoose = require('mongoose');
const schemas = require('./schemas');
const pino = require('pino')();

const db = mongoose.connection;
mongoose.Promise = Promise;

db.on('error', () => pino.error('connection error'));

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/ladcloud`);

module.exports = function models() {
  return new Promise((resolve) => {
    db.once('open', () => {
      resolve({
        User: mongoose.model('User', schemas.user),
        NewEmailRequest: mongoose.model('NewEmailRequest', schemas.NewEmailRequest),
        ResetPassword: mongoose.model('ResetPassword', schemas.resetPassword),
      });
    });
  });
};

