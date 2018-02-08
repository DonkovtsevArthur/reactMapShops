import * as Boom from 'boom';
import * as Logger from 'pino';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import { DATA_SOURCE, WIDGET } from '../../interfaces/constants';

const logger = Logger();

export async function addApp(payload, response, model, hemera) {
  try {
    const name = payload.name;
    const app = await model.findOne({ name });
    if (app) {
      throw new Error('Приложение с таким именем уже существует');
    }
    const newApp = await model.create({ ...payload });
    const path: HemeraPath = { topic: 'develop', cmd: 'appAdd' };
    const data = { appId: newApp._id, developId: newApp.developId };
    const client = new HemeraClient(hemera, path, data);
    const result = await client.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function updateApp(payload, response, model, hemera) {
  try {
    const name = payload.name;
    const newApp = await model.findOneAndUpdate({ name }, { ...payload }, { new: true });
    const path: HemeraPath = { topic: 'userApp', cmd: 'newVersionApp', timeout$: 20000 };
    const data: any = { appId: newApp._id, type: newApp.type };
    switch (newApp.type) {
      case DATA_SOURCE:
        data.groups = newApp.groups;
      case WIDGET:
        data.settings = newApp.settings;
    }
    const client = new HemeraClient(hemera, path, data);
    await client.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function deleteApp(payload, response, model, hemera) {
  try {
    const developId = payload.developId;
    const name = payload.name;
    const app = await model.findOne({ $and: [{ name }, { developId }] });
    const data = { appId: app._id, developId: app.developId };
    await app.remove();
    const path: HemeraPath = { topic: 'develop', cmd: 'appRemove' };
    const client = new HemeraClient(hemera, path, data);
    const result = await client.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function getApp(payload, response, model) {
  try {
    const name = payload.name;
    const developId = payload.auth.credentials.developId;
    const app = await model.findOne({ $and: [
      { name },
      { developId },
    ]});
    if (app) {
      response(null, app);
    } else {
      response(Boom.notFound());
    }
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function getAllApp(payload, response, model) {
  try {
    const apps = await model.find({ status: 'active' })
    .select({ groups: 0, settings: 0 });
    response(null, apps);
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function setStatus(payload, response, model) {
  try {
    const name = payload.name;
    const status = payload.status;
    const developId = payload.developId;
    const app = await model.findOneAndUpdate(
      { $and: [{ name }, { developId }] },
      { $set: { status } }
    );
    if (app) {
      response(null, { status: 'ok' });
    } else {
      response(Boom.notFound());
    }
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function getAppForUser(payload, response, model) {
  try {
    const appId = payload.appId;
    const app = await model.findById(appId, { _id: 0, __v: 0 });
    if (app) {
      response(null, app);
    } else {
      response(Boom.notFound());
    }
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}
