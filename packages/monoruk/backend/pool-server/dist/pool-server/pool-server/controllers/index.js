"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Logger = require("pino");
const logger = Logger();
async function get(payload, response, model) {
    try {
        const pool = await model.find();
        response(null, pool);
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.get = get;
async function add(payload, response, model) {
    try {
        const name = payload.name;
        const type = payload.type;
        const column = await model.findOne({ name });
        if (column) {
            throw new Error('Колонка уже существует');
        }
        await model.create({ name, type });
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.add = add;
