"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Logger = require("pino");
const fs = require("fs-extra");
const schema_1 = require("../schema");
const constants_1 = require("../../interfaces/constants");
const dictionaryTpl_1 = require("../schema/dictionaryTpl");
const logger = Logger();
async function create(payload, response, db) {
    try {
        const { data, _id, groups, dictionary } = payload;
        let item = [];
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
        const collection = db.model(`_${_id}|${dictionary}_`, schema_1.default);
        await Promise.all(data.map(async (item) => {
            await collection.findOneAndUpdate({ id: item.id }, { $set: { value: item.value } }, { upsert: true });
        }));
        const filename = `_${_id}|${dictionary}_`;
        const file = `${constants_1.DICTIONARIES_PATH}/${filename}.xml`;
        const exist = await fs.pathExists(file);
        const mongoHost = process.env.MONGO_HOST || 'localhost';
        const mongoDb = process.env.MONGO_DB || 'dictionaries';
        if (!exist) {
            await fs.outputFile(file, dictionaryTpl_1.default(filename, mongoHost, mongoDb));
        }
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.create = create;
async function update(payload, response, db) {
    try {
        const { data, _id, dictionary } = payload;
        const collection = db.model(`_${_id}|${dictionary}_`, schema_1.default);
        await Promise.all(data.map(async (item) => {
            await collection.findOneAndUpdate({ id: item.id }, { $set: { value: item.value } }, { upsert: true });
        }));
        const filename = `_${_id}|${dictionary}_`;
        const file = `${constants_1.DICTIONARIES_PATH}/${filename}.xml`;
        const exist = await fs.pathExists(file);
        const mongoHost = process.env.MONGO_HOST || 'localhost';
        const mongoDb = process.env.MONGO_DB || 'dictionaries';
        if (!exist) {
            await fs.outputFile(file, dictionaryTpl_1.default(filename, mongoHost, mongoDb));
        }
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.update = update;
