import * as Boom from 'boom';
import * as Logger from 'pino';
import * as Mongoose from 'mongoose';
import { HemeraClient, HemeraPath } from '../../interfaces/core';

const logger = Logger();

export interface ControllerData {
  response(error: Boom.BoomError | null, data: any): void;
  model: Mongoose.Model<Mongoose.Document>;
}

export interface GetControllerData extends ControllerData {
  appId: string;
  token: string;
  hemera: Hemera;
}

export interface UpdateControllerData extends ControllerData {
  payload: Widget.WidgetConfig;
}

export interface WidgetDocument extends Mongoose.Document, Widget.WidgetConfig {}

export interface Controller {
  get(data: GetControllerData): void;
  update(data: UpdateControllerData): void;
}

const controller: Controller = {
  async get({ appId, token, response, model, hemera }) {
    try {
      const app = <WidgetDocument>await model.findOne({ appId }).select({
        _id: 0,
        __v: 0,
      });
      const newApp = app ? app : <WidgetDocument>await model.create({ appId });
      const path: HemeraPath = { topic: 'userApp', cmd: 'getDataSourceConfig' };
      const client = new HemeraClient(hemera, path, { token });
      const result = await client.act();
      const group = newApp.group ? newApp.group : result.groups[0].name;
      response(null, {
        ...newApp.toObject(),
        group,
        dataSourceConfig: result.groups,
        dataSourceId: result._id,
      });
    } catch (error) {
      response(Boom.badImplementation(), null);
      logger.error(error);
    }
  },
  async update({ payload, response, model }) {
    try {
      const { dataSourceConfig, status, token, ...config } = payload;
      logger.info(payload);
      await model.update({ appId: payload.appId }, config, { upsert: true });
      response(null, { status: 'ok' });
    } catch (error) {
      response(Boom.badImplementation(), null);
      logger.error(error);
    }
  },
};

export default controller;
