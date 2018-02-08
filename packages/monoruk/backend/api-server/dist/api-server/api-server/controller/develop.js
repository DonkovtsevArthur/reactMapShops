"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
async function add(request, reply) {
    try {
        const path = { topic: 'develop', cmd: 'add' };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, request.payload);
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.add = add;
async function login(request, reply) {
    try {
        const path = { topic: 'develop', cmd: 'login' };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, request.payload);
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.login = login;
