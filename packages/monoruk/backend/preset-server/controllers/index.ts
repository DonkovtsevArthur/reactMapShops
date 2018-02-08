import * as Boom from 'boom';
import * as Logger from 'pino';
import * as md5 from 'md5';
import configs, { Config } from '../configs';
import step from '../helper/step';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import dashboard from '../../api/routes/dashboard';

const logger = Logger();

async function setup(config: Config, param) {
  try {
    const { hemera, orgId, datasourceId, token } = param;
    const process = {};
    await step({ hemera, topic: 'user', cmd: 'add', payload: { orgId } }); // add user
    const dataSource = await step({
      hemera,
      topic: 'userApp',
      cmd: 'addDataSource',
      payload: {
        orgId,
        token,
        appId: datasourceId,
      },
    }); // add dataSource
    for (const dashboard of config.dashboards) {
      await step({
        hemera,
        topic: 'dashboard',
        cmd: 'add',
        payload: {
          orgId,
          group: dashboard.group,
          alias: dashboard.alias,
        }}); // add dashboard
      const widgets = await Promise.all(dashboard.widgetConfigs.map((item) => {
        return step({
          hemera,
          topic: 'userApp',
          cmd: 'addWidget',
          payload: {
            orgId,
            appId: global.process.env.DEFAULT_WIDGET_ID,
            dataSourceId: dataSource.id,
            ...item,
          },
        });
      })); // add widgets
      await Promise.all(widgets.map((item, i) => {
        return step({
          hemera,
          topic: 'widget',
          cmd: 'update',
          payload: {
            appId: item.id,
            ...dashboard.widgets[i],
          },
        });
      })); // setup widgets
    }
    return { token: dataSource.token, appId: dataSource.id };
  } catch (error) {
    logger.error(error);
  }
}

export async function user1cFromEvotor(param, response, hemera: Hemera) {
  try {

    const result = await setup(configs.user1cFromEvotor, { hemera, ...param });
    response(null, result);
  } catch (error) {
    response(Boom.badImplementation('terrible implementation', error));
    logger.error(error);
  }
}

export async function evotorMonitorClient(param, response, hemera: Hemera) {
  try {
    await step({
      hemera,
      topic: 'dictionary',
      cmd: 'update',
      payload: {
        _id: param.orgId,
        dictionary: 'copyOrgId',
        data: [{ id: param.orgId, value: 'Мои магазины' }],
      },
    }); // add new field on dictionary or create new
    const result = await setup(configs.evotorMonitorClient, { hemera, ...param });
    response(null, result);
  } catch (error) {
    response(Boom.badImplementation('terrible implementation', error));
    logger.error(error);
  }
}

export async function editor(param, response, hemera: Hemera) {
  try {
    const result = await setup(configs.editor, { hemera, ...param });
    response(null, result);
  } catch (error) {
    response(Boom.badImplementation('terrible implementation', error));
    logger.error(error);
  }
}

export async function chiefClient(param, response, hemera: Hemera) {
  try {
    const result = await setup(configs.chiefClient, { hemera, ...param });
    response(null, result);
  } catch (error) {
    response(Boom.badImplementation('terrible implementation', error));
    logger.error(error);
  }
}

export async function mallClient(param, response, hemera: Hemera) {
  try {
    await step({
      hemera,
      topic: 'dictionary',
      cmd: 'update',
      payload: {
        _id: param.orgId,
        dictionary: 'copyOrgId',
        data: [{ id: param.orgId, value: 'Мои магазины' }],
      },
    }); // add new field on dictionary or create new
    const result = await setup(configs.mallClient, { hemera, ...param });
    response(null, result);
  } catch (error) {
    response(Boom.badImplementation('terrible implementation', error));
    logger.error(error);
  }
}

export async function marketClient(param, response, hemera: Hemera) {
  try {
    await step({
      hemera,
      topic: 'dictionary',
      cmd: 'update',
      payload: {
        _id: param.orgId,
        dictionary: 'copyOrgId',
        data: [{ id: param.orgId, value: 'Мои магазины' }],
      },
    }); // add new field on dictionary or create new
    const result = await setup(configs.marketClient, { hemera, ...param });
    response(null, result);
  } catch (error) {
    response(Boom.badImplementation('terrible implementation', error));
    logger.error(error);
  }
}

export async function copyApps(param, response, hemera: Hemera) {
  try {
    const { accessToken, orgId, alias, apps, group } = param;
    await step({
      hemera,
      topic: 'dashboard',
      cmd: 'add',
      payload: {
        orgId,
        alias,
        group,
        copy: true,
      },
    }); // add dashboard
    const parent = await step({
      hemera,
      topic: 'access',
      cmd: 'getParent',
      payload: {
        accessToken,
      },
    }); // get parent orgId
    await step({
      hemera,
      topic: 'dictionary',
      cmd: 'update',
      payload: {
        _id: orgId,
        dictionary: 'copyOrgId',
        data: [{ id: parent, value: alias }],
      },
    }); // add new field on dictionary or create new
    const userApps = await Promise.all(apps.map(async (app) => {
      return await step({
        hemera,
        topic: 'userApp',
        cmd: 'get',
        payload: {
          appId: app.appId,
        },
      });
    })); // get userApp
    const copyApps = userApps.map((app: any) => ({
      accessToken,
      orgId,
      name: app.name,
      type: app.type,
      alias: app.alias,
      developId: app.developId,
      appId: app.appId,
      token: md5(app.token),
      settings: app.settings,
      copy: true,
      parent: app._id,
      status: app.status,
    }));
    await Promise.all(copyApps.map(async (widget) => {
      return await step({
        hemera,
        topic: 'userApp',
        cmd: 'copyWidget',
        payload: {
          widget,
          orgId,
        },
      });
    }));
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation('terrible implementation', error));
    logger.error(error);
  }
}
