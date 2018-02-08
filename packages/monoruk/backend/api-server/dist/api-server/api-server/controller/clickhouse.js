"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
async function data(request, reply) {
    try {
        const path = { topic: 'clickhouse', cmd: 'data' };
        const hemera = request.hemera();
        const app = request.auth.credentials;
        const data = request.payload;
        const client = new core_1.HemeraClient(hemera, path, { app, data });
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.data = data;
async function getData(request, reply) {
    try {
        const path = { topic: 'clickhouse', cmd: 'getData', timeout$: 5000 };
        const hemera = request.hemera();
        const app = request.auth.credentials;
        const query = request.payload.query;
        const client = new core_1.HemeraClient(hemera, path, { app, query });
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.getData = getData;
