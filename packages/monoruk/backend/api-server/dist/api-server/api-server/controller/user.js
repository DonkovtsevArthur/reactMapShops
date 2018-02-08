"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
async function add(request, reply) {
    try {
        const path = { topic: 'user', cmd: 'add' };
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
async function changeStatus(request, reply) {
    try {
        const path = { topic: 'user', cmd: 'changeStatus' };
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
exports.changeStatus = changeStatus;
