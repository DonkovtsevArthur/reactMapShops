"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
const controller = {
    async get(request, reply) {
        try {
            const path = { topic: 'app', cmd: 'get' };
            const hemera = request.hemera();
            const credentials = request.auth.credentials;
            const payload = request.payload;
            const data = Object.assign({}, payload, credentials);
            const client = new core_1.HemeraClient(hemera, path, data);
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async getAll(request, reply) {
        try {
            const path = { topic: 'app', cmd: 'getAll' };
            const hemera = request.hemera();
            const client = new core_1.HemeraClient(hemera, path, {});
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async add(request, reply) {
        try {
            const path = { topic: 'app', cmd: 'add' };
            const hemera = request.hemera();
            const credentials = request.auth.credentials;
            const payload = request.payload;
            const data = Object.assign({}, payload, credentials);
            const client = new core_1.HemeraClient(hemera, path, data);
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async update(request, reply) {
        try {
            const path = { topic: 'app', cmd: 'update', timeout$: 20000 };
            const hemera = request.hemera();
            const credentials = request.auth.credentials;
            const payload = request.payload;
            const data = Object.assign({}, payload, credentials);
            const client = new core_1.HemeraClient(hemera, path, data);
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async remove(request, reply) {
        try {
            const path = { topic: 'app', cmd: 'remove' };
            const hemera = request.hemera();
            const credentials = request.auth.credentials;
            const data = Object.assign({}, request.payload, credentials);
            const client = new core_1.HemeraClient(hemera, path, data);
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async status(request, reply) {
        try {
            const path = { topic: 'app', cmd: 'status' };
            const hemera = request.hemera();
            const credentials = request.auth.credentials;
            const data = Object.assign({}, request.payload, credentials);
            const client = new core_1.HemeraClient(hemera, path, data);
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
};
exports.default = controller;
