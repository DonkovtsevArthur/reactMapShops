import * as Boom from 'boom';
import * as Logger from 'pino';
import { HemeraClient, HemeraPath } from '../../interfaces/core';

const logger = Logger();

export async function add(payload, response, model, hemera) {
  try {
    const orgId = payload.orgId;
    const user = await model.findOne({ orgId });
    if (user) {
      response(null, { status: 'User exist' });
      logger.info('user!!!', user);
      return;
    }
    const newUser = await model.create({ orgId });
    const appPath: HemeraPath = { topic: 'dashboard', cmd: 'add' };
    const alias = 'Рабочий стол';
    const clientApp = new HemeraClient(hemera, appPath, { orgId, alias });
    await clientApp.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function changeStatus(payload, response, model) {
  try {
    const orgId = payload.orgId;
    const status = payload.status;
    const user = await model.findOne({ orgId });
    if (!user) {
      response(Boom.badRequest());
      return;
    }
    await user.update({ $set: { status } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function getUserColumns(payload, response, model) {
  try {
    const orgId = payload.orgId;
    const user = await model.findOne({ orgId });
    if (!user) {
      response(Boom.badRequest());
      return;
    }
    const columns = user.columns.map(item => item.column);
    response(null, columns);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function addAppInUser(payload, response, model) {
  try {
    const orgId = payload.orgId;
    const appId = payload.appId;
    const temp = payload.temp;
    const user = await model.findOne({ orgId });
    if (!user) {
      response(Boom.badRequest());
      return;
    }
    const columns = Object.keys(temp).map((item) => {
      const column = temp[item];
      const app = appId;
      return { app, column };
    });
    logger.info(columns, appId);
    await user.update({ $push: { apps: appId, columns: { $each: columns } } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function addNewColumn(payload, response, model) {
  try {
    await Promise.all(Object.keys(payload).map(async (orgId) => {
      const user = await model.findOneAndUpdate(
        { orgId },
        { $push: { columns: { $each: payload[orgId] } } }
      );
    }));
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function addDashboard(payload, response, model) {
  try {
    const dashboardId = payload.dashboardId;
    const orgId = payload.orgId;
    await model.findOneAndUpdate({ orgId }, { $push: { dashboards: dashboardId } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function removeApp(payload, response, model) {
  try {
    const { orgId, appId } = payload;
    await model.findOneAndUpdate({ orgId }, { $pull: { apps: appId } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}
