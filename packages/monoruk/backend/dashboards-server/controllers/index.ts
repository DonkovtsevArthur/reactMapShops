import * as Boom from 'boom';
import * as Logger from 'pino';
import { HemeraClient, HemeraPath } from '../../interfaces/core';
import { Mongoose, MongooseDocument } from 'mongoose';

const logger = Logger();

export async function add(payload, response, model, hemera) {
  try {
    const { orgId, alias, copy, group } = payload;
    logger.info('add dashboard', orgId, alias);
    await model.update(
      {
        orgId,
      },
      {
        $set: {
          active: false,
        },
      },
      { 
        multi: true,
      }
  );
    const dashboard = await model.create({ copy, orgId, alias, group, active: true });
    logger.info('dashboard created', dashboard);
    const appPath: HemeraPath = { topic: 'user', cmd: 'addDashboard' };
    const data = { orgId, dashboardId: dashboard._id };
    const clientApp = new HemeraClient(hemera, appPath, data);
    await clientApp.act();
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function getAll(payload, response, model) {
  try {
    const { orgId } = payload;
    const dashboards = await model.find({ orgId }).select({
      __v: 0,
      widgets: 0,
      orgId: 0,
    });
    console.log('dashboards', dashboards);
    response(null, dashboards);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function get(payload, response, model) {
  try {
    const { dashboardId, orgId } = payload;
    await model.update(
      { $and: [
        { orgId },
      ] },
      {
        $set: { active: false },
      },
      { 
        multi: true,
      }
    );
    const dashboard = await model.findOneAndUpdate(
      {
        $and: [
          { _id: dashboardId },
          { orgId },
        ],
      },
      {
        $set: { active: true },
      },
      {
        new: true,
      }
    ).select(
      {
        __v: 0,
        orgId: 0,
      }
    );
    response(null, dashboard);
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function addWidget(payload, response, model) {
  try {
    const { widgetCfg, orgId } = payload;
    const result = await model.findOneAndUpdate(
      {
        $and: [
          { active: true },
          { orgId },
        ],
      },
      {
        $push: {
          widgets: widgetCfg,
        },
      },
      {
        returnNewDocument: true,
      }
    );
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function removeWidget(payload, response, model) {
  try {
    const { appId, dashboardId } = payload;
    await model.findByIdAndUpdate(dashboardId, { $pull: { widgets: { i: appId } } });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function place(payload, response, model) {
  try {
    const { place } = payload;
    await Promise.all(place.map(async (widget) => {
      return model.findOneAndUpdate({ 'widgets.i': widget.i }, { $set: {
        'widgets.$.x': widget.x,
        'widgets.$.y': widget.y,
        'widgets.$.w': widget.w,
        'widgets.$.h': widget.h,
      } });
    }));
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function remove(payload, response, model, hemera) {
  try {
    const { dashboardId } = payload;
    const dashboard = await model.findById(dashboardId);
    const widgets = dashboard.widgets;
    await Promise.all(widgets.map(async (widget) => {
      const removeAppInUserPath: HemeraPath = { topic: 'userApp', cmd: 'removeWidget' };
      const clientRemoveApp = new HemeraClient(hemera, removeAppInUserPath, {
        dashboardId,
        appId: widget.original || widget.i,
      });
      return clientRemoveApp.act();
    }));
    await model.remove({ _id: dashboardId });
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}
