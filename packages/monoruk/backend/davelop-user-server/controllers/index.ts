import * as Boom from 'boom';
import * as Logger from 'pino';
import * as jsonwebtoken from 'jsonwebtoken';

const logger = Logger();

export async function login(payload, response, model) {
  try {
    const login = payload.login;
    const password = payload.password;
    const user = await model.findOne({ login });
    if (!user) {
      response(Boom.notFound());
      return;
    }
    const compare = await user.comparePassword(password);
    if (compare) {
      const token = jsonwebtoken.sign({ developId: user._id }, process.env.JWT_SECRET);
      response(null, { token });
    } else {
      throw new Error('Неверный логин или пароль');
    }
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function add(payload, response, model) {
  try {
    const login = payload.login;
    const user = await model.findOne({ login });
    if (user) {
      response(Boom.conflict());
      return;
    }
    const newUser = await model.create(payload);
    const token = jsonwebtoken.sign({ developId: newUser._id }, process.env.JWT_SECRET);
    response(null, { token });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function appAdd(payload, response, model) {
  try {
    const developId = payload.developId;
    const appId = payload.appId;
    const user = await model.findOne({ _id: developId });
    if (!user) {
      response(Boom.badRequest());
      return;
    }
    await user.update({ $push: { apps:  appId } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function appRemove(payload, response, model) {
  try {
    const developId = payload.developId;
    const appId = payload.appId;
    const user = await model.findOne({ _id: developId });
    if (!user) {
      response(Boom.badRequest());
      return;
    }
    await user.update({ $pull: { apps: appId } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}
