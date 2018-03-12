const Boom = require('boom');
const logger = require('pino')();

module.exports = {
  async create(request, reply) {
    const uuid = request.payload.uuid;
    const token = request.payload.token;
    const user = await request.db.User.findOne({ uuid });
    if (user) {
      reply(Boom.conflict());
      return false;
    }
    const newUser = await request.db.User.create({ uuid, token });
    if (!newUser) {
      reply(Boom.badImplementation());
      return false;
    }
    reply();
    return true;
  },
  async status(request, reply) {
    const uuid = request.payload.uuid;
    const active = request.payload.active;
    const user = request.db.User.findOne({ uuid });
    if (!user) {
      reply(Boom.badImplementation());
      return false;
    }
    const newUser = await user.update({ $set: { active } });
    if (!newUser) {
      reply(Boom.badImplementation());
      return false;
    }
    reply();
    return true;
  },
  async devices(request, reply) {
    const data = request.payload;
    const user = request.auth.credentials;
    const newUser = await user.update({ $set: { devices: data } });
    if (!newUser) {
      reply(Boom.badImplementation('Ошибка базы данных'));
      return;
    }
    reply();
  },
  async employees(request, reply) {
    const data = request.payload;
    const user = request.auth.credentials;
    const newUser = await user.update({ $set: { employees: data } });
    logger.info('employess', data);
    if (!newUser) {
      reply(Boom.badImplementation('Ошибка базы данных'));
      return;
    }
    reply();
  },
  async stores(request, reply) {
    const data = request.payload;
    const user = request.auth.credentials;
    const newUser = await user.update({ $set: { stores: data } });
    logger.info('data', data);
    logger.info('newUser', newUser);
    if (!newUser) {
      reply(Boom.badImplementation('Ошибка базы данных'));
      return;
    }
    reply();
  }
};
