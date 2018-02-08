"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
async function add(request, reply) {
    try {
        const path = { topic: 'dashboard', cmd: 'add' };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.add = add;
async function getAll(request, reply) {
    try {
        const path = { topic: 'dashboard', cmd: 'getAll' };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.getAll = getAll;
async function get(request, reply) {
    try {
        const path = { topic: 'dashboard', cmd: 'get' };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.get = get;
async function place(request, reply) {
    try {
        const path = { topic: 'dashboard', cmd: 'place' };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.place = place;
async function remove(request, reply) {
    try {
        const path = { topic: 'dashboard', cmd: 'remove' };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.remove = remove;
