"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
const controller = {
    async share(request, reply) {
        try {
            const path = { topic: 'access', cmd: 'share' };
            const hemera = request.hemera();
            const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async openShare(request, reply) {
        try {
            const path = { topic: 'access', cmd: 'openShare' };
            const hemera = request.hemera();
            const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async closeShare(request, reply) {
        try {
            const path = { topic: 'access', cmd: 'closeShare' };
            const hemera = request.hemera();
            const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async removeShare(request, reply) {
        try {
            const path = { topic: 'access', cmd: 'removeShare' };
            const hemera = request.hemera();
            const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async getShareToApp(request, reply) {
        try {
            const path = { topic: 'access', cmd: 'getShareToApp' };
            const hemera = request.hemera();
            const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    async copy(request, reply) {
        try {
            const path = { topic: 'access', cmd: 'copy' };
            const hemera = request.hemera();
            const client = new core_1.HemeraClient(hemera, path, Object.assign({}, request.payload));
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
