import * as Boom from 'boom';
import * as Logger from 'pino';
import * as Mongoose from 'mongoose';
import * as fs from 'fs-extra';
import schema from '../schema';
import { DICTIONARIES_PATH } from '../../interfaces/constants';
import dictionaryTpl from '../schema/dictionaryTpl';

const logger = Logger();

export interface Item {
  name: string;
  alias: string;
  type: string;
  businessType: string;
  system: boolean;
  needDirectory: boolean;
} 

export interface Group {
  name: string;
  alias: string;
  period: string;
  items: Item[];
  extras: any;
}

export interface Map {
  id: string;
  value: string;
}

export interface Payload {
  data: Map[];
  _id: string;
  groups: Group[];
  dictionary: string;
}

export async function create(payload: Payload, response, db: Mongoose.Connection) {
  try {
    const { data, _id, groups, dictionary } = payload;
    let item: Item[] = [];
    groups.some((group) => {
      item = group.items.filter(item => item.name === dictionary);
      if (item.length > 0) {
        return true;
      }
      return false;
    });
    if (!item[0] || !item[0].needDirectory) {
      throw new Error('Неверное значение для словаря');
    }
    const type = item[0].type;
    const collection = db.model(`_${_id}|${dictionary}_`, schema);
    await Promise.all(data.map(async (item) => {
      await collection.findOneAndUpdate(
        { id: item.id },
        { $set: { value: item.value } },
        { upsert: true });
    }));
    const filename = `_${_id}|${dictionary}_`;
    const file = `${DICTIONARIES_PATH}/${filename}.xml`;
    const exist = await fs.pathExists(file);
    const mongoHost = process.env.MONGO_HOST || 'localhost';
    const mongoDb = process.env.MONGO_DB || 'dictionaries';
    if (!exist) {
      await fs.outputFile(file, dictionaryTpl(filename, mongoHost, mongoDb));
    }
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}

export async function update(payload: Payload, response, db: Mongoose.Connection) {
  try {
    const { data, _id, dictionary } = payload;
    const collection = db.model(`_${_id}|${dictionary}_`, schema);
    await Promise.all(data.map(async (item) => {
      await collection.findOneAndUpdate(
        { id: item.id },
        { $set: { value: item.value } },
        { upsert: true });
    }));
    const filename = `_${_id}|${dictionary}_`;
    const file = `${DICTIONARIES_PATH}/${filename}.xml`;
    const exist = await fs.pathExists(file);
    const mongoHost = process.env.MONGO_HOST || 'localhost';
    const mongoDb = process.env.MONGO_DB || 'dictionaries';
    if (!exist) {
      await fs.outputFile(file, dictionaryTpl(filename, mongoHost, mongoDb));
    }
    response(null, { status: 'ok' });
  } catch (error) {
    response(Boom.badImplementation());
    logger.error(error);
  }
}
