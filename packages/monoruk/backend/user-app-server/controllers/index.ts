import * as Boom from 'boom';
import * as Logger from 'pino';
import * as uuid from 'uuid';
import * as md5 from 'md5';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import { DATA_SOURCE, WIDGET } from '../../interfaces/constants';
import { assignColumns, combineConfig } from '../helper';

const logger = Logger();

async function getFreeColumn(orgId, hemera) {
  // get user columns
  const userPath: HemeraPath = { topic: 'user', cmd: 'getUserColumns' };
  const clientUser = new HemeraClient(hemera, userPath, { orgId });
  const orgColumns = await clientUser.act();
  // get pool columns
  const poolPath: HemeraPath = { topic: 'pool', cmd: 'get' };
  const clientPool = new HemeraClient(hemera, poolPath, {});
  const poolColumns = await clientPool.act();
  // assigne columns
  const freeColumns = poolColumns.filter((item) => {
    return orgColumns.indexOf(item.name) >= 0 ? false : true;
  });
  return freeColumns;
}

export async function authorizationRead(payload, response, model, hemera) {
  const token = payload.token;
  const app = await model.findOne({ $and: [
    { token },
    { status: 'active' },
    { type: 'dataSource' },
  ] });
  if (app) {
    response(null, app);
  } else {
    const app = await model.findOne({ $and: [
      { token },
      { status: 'active' },
      { type: 'widget' },
    ] });
    if (app && app.copy) {
      const id = app.parent;
      const widget = await model.findById(id);
      if (widget) {
        const dataSource = await model.findOne({ $and: [
          { token: widget.token },
          { status: 'active' },
          { type: 'dataSource' },
        ] });
        if (dataSource) {
          response(null, dataSource);
        } else {
          response(null, false);
        }
      } else {
        response(null, false);
      }
    } else {
      response(null, false);
    }
  }
}

export async function authorizationWrite(payload, response, model, hemera) {
  const token = payload.token;
  const app = await model.findOne({ $and: [
    { token },
    { status: 'active' },
    { copy: false },
  ] });
  if (app && !app.copy) {
    response(null, app);
  } else {
    response(null, false);
  }
}

export async function addWidget(payload, response, model, hemera) {
  try {
    const { appId, orgId, dataSourceId, place } = payload;
    // get app schema
    const appPath: HemeraPath = { topic: 'app', cmd: 'getAppForUser' };
    const clientApp = new HemeraClient(hemera, appPath, { appId });
    const app = await clientApp.act();
    if (app.type !== 'widget') throw new Error('Приложение не является виджетом');
    const dataSource = await model.findById(dataSourceId);
    const token = dataSource.token;
    app.orgId = orgId;
    app.appId = appId;
    app.token = token;
    delete app.status;
    const userApp = await model.create({ ...app });
    const addAppInUserPath: HemeraPath = { topic: 'user', cmd: 'addAppInUser' };
    const clientAddApp = new HemeraClient(hemera, addAppInUserPath, {
      orgId,
      appId: userApp._id,
      temp: [],
    });
    await clientAddApp.act();
    const widgetId = userApp._id;
    const { w, h, url, local } = app.settings;
    const widgetCfg = { w, h, url, local, i: widgetId, token: app.token, ...place };
    const addWidgetToDashboard: HemeraPath = { topic: 'dashboard', cmd: 'addWidget' };
    const clientAddWidget = new HemeraClient(hemera, addWidgetToDashboard, {
      orgId,
      widgetCfg,
    });
    await clientAddWidget.act();
    response(null, { appId, id: userApp._id });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function copyWidget(payload, response, model, hemera) {
  try {
    // get app schema
    const widget = payload.widget;
    const userApp = await model.create({ ...widget });
    const addAppInUserPath: HemeraPath = { topic: 'user', cmd: 'addAppInUser' };
    const clientAddApp = new HemeraClient(hemera, addAppInUserPath, {
      orgId: payload.orgId,
      appId: userApp._id,
      temp: [],
    });
    await clientAddApp.act();
    const widgetId = userApp._id;
    const { w, h, url, local } = widget.settings;
    const widgetCfg = {
      w,
      h,
      url,
      local,
      i: widget.parent,
      token: widget.token,
      original: widgetId,
    };
    const addWidgetToDashboard: HemeraPath = { topic: 'dashboard', cmd: 'addWidget' };
    const clientAddWidget = new HemeraClient(hemera, addWidgetToDashboard, {
      widgetCfg,
      orgId: widget.orgId,
    });
    await clientAddWidget.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function removeWidget(payload, response, model, hemera) {
  try {
    const { appId, dashboardId } = payload;
    const removedApp = await model.findByIdAndRemove(appId);
    const removeAppInUserPath: HemeraPath = { topic: 'user', cmd: 'removeApp' };
    const clientRemoveApp = new HemeraClient(hemera, removeAppInUserPath, {
      appId,
      orgId: removedApp._id,
    });
    await clientRemoveApp.act();

    const removeAppFromDashboardPath: HemeraPath = { topic: 'dashboard', cmd: 'removeWidget' };
    const clientRemoveWidget = new HemeraClient(hemera, removeAppFromDashboardPath, {
      appId,
      dashboardId,
    });
    await clientRemoveWidget.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function addDataSource(payload, response, model, hemera) {
  try {
    const appId = payload.appId;
    const orgId = payload.orgId;
    const token = payload.token || uuid.v4();
    // get app schema
    const exist = await model.findOne({ $and: [{ orgId }, { appId }] });
    if (exist) {
      response(null, { token: exist.token, id: exist._id });
      logger.info('Источник данных уже куплен');
      return;
    }
    const appPath: HemeraPath = { topic: 'app', cmd: 'getAppForUser' };
    const clientApp = new HemeraClient(hemera, appPath, { appId });
    const app = await clientApp.act();
    app.orgId = orgId;
    app.appId = appId;
    delete app.status;
    const freeColumns = await getFreeColumn(app.orgId, hemera);
    const { assignUserApp, temp } = await assignColumns(
      app.groups,
      freeColumns,
      {},
      hemera
    );
    const groups: any = await assignUserApp;
    delete app.status;
    app.token = token;
    const userApp = await model.create({ ...app, groups });
    const addAppInUserPath: HemeraPath = { topic: 'user', cmd: 'addAppInUser' };
    const promises = Object.keys(temp).map(async item => await temp[item]);
    const resultTemp = await Promise.all(promises);
    const clientAddApp = new HemeraClient(hemera, addAppInUserPath, {
      orgId,
      appId: userApp._id,
      temp: resultTemp,
    });
    await clientAddApp.act();
    logger.info('Приложение добавлено', { appId, token });
    response(null, { token, id: userApp._id });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function getAllDataSource(payload, response, model) {
  try {
    const { orgId } = payload;
    const dataSource = await model.find({ $and: [
      { type: 'dataSource' },
      { orgId },
    ] }).select({
      groups: 0,
      developId: 0,
      type: 0,
      orgId: 0,
      appId: 0,
      status: 0,
      token: 0,
    });
    response(null, dataSource);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function setStatus(payload, response, model) {
  try {
    const appId = payload.appId;
    const status = payload.status;
    const app = await model.findById(appId);
    if (!app) throw new Error('Приложение не найдено');
    await app.update({ $set: { status } });
    const copys = await model.find({ parent: appId });
    await Promise.all(copys.map((copy) => {
      return copy.update({ $set: { status } });
    }));
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function setStatusByAccessToken(payload, response, model) {
  try {
    const accessToken = payload.accessToken;
    const status = payload.status;
    await model.update({ accessToken }, { $set: { status } }, { multi: true });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function removeByAccessToken(payload, response, model) {
  try {
    const accessToken = payload.accessToken;
    await model.remove({ accessToken });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function get(payload, response, model) {
  try {
    const appId = payload.appId;
    const app = await model.findById(appId).select({
      'groups.items.column': 0,
    });
    response(null, app);
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export function getConfig(payload, response, model) {
  try {
    response(null, payload.groups);
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function getUserToken(payload, response, model) {
  try {
    const appId = payload.appId;
    const app = await model.findById(appId);
    const token = app.token;
    response(null, { token });
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function put(payload, response, model, hemera) {
  try {
    const userAppId = payload.userAppId;
    const newGroups = payload.groups;
    const oldUserApp = await model.findById(userAppId);
    /**
     * Сравнивание старого и нового конфига.
     * При необходимости перегенерация или переназначение колонок в КликХаусе
     * 
     */
    const plainOldApp = oldUserApp.toObject();
    const oldGroups = plainOldApp.groups;
    const { assignGroups, temp } = await combineConfig(oldGroups, newGroups, hemera, oldGroups);
    const groups = await assignGroups;
    await model.update({ _id: userAppId }, { $set: { groups } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function updateNewVersion(payload, response, model, hemera) {
  try {
    const appId = payload.appId;
    const type = payload.type;
    if (type === 'dataSource') {
      const userApp = await model.find({ appId });
      const newGroups = payload.groups;
      const mainTemp = {};
      let allPromiseTemp = {};
      const result = Promise.all(userApp.map(async (app) => {
        const userAppId = app._id;
        const orgId = app.orgId;
        const freeColumns = await getFreeColumn(orgId, hemera);
        const plainOldApp = app.toObject();
        const oldGroups = plainOldApp.groups;
        const {
        assignGroups,
          temp,
      } = await combineConfig(oldGroups, newGroups, freeColumns, hemera, oldGroups, allPromiseTemp);
        allPromiseTemp = temp;
        mainTemp[app.orgId] = await Promise.all(Object.keys(temp).map(async item => ({
          app: app._id,
          column: await temp[item],
        })));
        const groups = await assignGroups;
        return model.update({ _id: userAppId }, { $set: { groups } });
      }));
      await result;
      const newUserColumn: HemeraPath = { topic: 'user', cmd: 'addNewColumn', timeout$: 20000 };
      const newColumn = new HemeraClient(hemera, newUserColumn, mainTemp);
      await newColumn.act();
      response(null, { status: 'ok' });
    } else if (type === 'widget') {
      const newSettings = payload.settings;
      await model.update({ appId }, { $set: { 'settings.url': newSettings.url } });
      response(null, { status: 'ok' });
    }
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function getDataSourceConfig(payload, response, model) {
  try {
    const token = payload.token;
    const app = await model.findOne({ $and: [{ token }, { type: 'dataSource' }] });
    if (app) {
      response(null, app);
      return;
    }
    const widget = await model.findOne({ $and: [{ token }, { type: 'widget' }] });
    if (widget) {
      const parentWidget = await model.findById(widget.parent);
      const originalDataSource = await model.findOne({
        $and: [
          {
            token: parentWidget.token,
          }, {
            type: 'dataSource',
          },
        ],
      });
      response(null, originalDataSource);
    }
    response(null, app);
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function verify(payload, response, model) {
  try {
    const { orgId, appId } = payload;
    const app = await model.findOne({ $and: [{ _id: appId }, { orgId }] });
    if (!app) {
      logger.info('app ------', app);
      response(Boom.locked());
      return;
    }
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}

export async function allOrgId(payload, response, model, hemera) {
  try {
    logger.info('getAll ---->');
    const { orgId } = payload;
    logger.info('orgId ---->', orgId);
    const app = await model.find({ $and: [{ copy: true }, { orgId }] });
    logger.info('app ---->', app);
    const parents = app.map(item => ({ _id: item.parent }));
    logger.info('parents ---->', parents);
    const realApp = await model.find({ $or: parents });
    logger.info('realApp ---->', realApp);
    const orgIds = realApp.map(item => item.orgId);
    logger.info('orgIds ---->', orgIds);
    response(null, orgIds);
  } catch (error) {
    response(Boom.badImplementation);
    logger.error(error);
  }
}
