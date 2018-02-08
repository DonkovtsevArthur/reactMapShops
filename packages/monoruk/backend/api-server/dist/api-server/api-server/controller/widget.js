"use strict";
/// <reference path="../../interfaces/core/Widget.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Logger = require("pino");
const core_1 = require("../../interfaces/core");
const logger = Logger();
const controller = {
    async get(request, reply) {
        try {
            const token = request.query.token;
            const path = { topic: 'widget', cmd: 'get' };
            const hemera = request.hemera();
            const appId = request.params.appId;
            const client = new core_1.HemeraClient(hemera, path, { appId, token });
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
            const path = { topic: 'widget', cmd: 'update' };
            const hemera = request.hemera();
            const config = request.payload;
            const client = new core_1.HemeraClient(hemera, path, Object.assign({}, config));
            const result = await client.act();
            reply(result);
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
    events(request, reply) {
        try {
            const appId = request.params.appId;
            const hemera = request.hemera();
            hemera.remove(appId, 0);
            reply.event({ id: 1, data: 'events' });
            hemera.add({ pubsub$: true, topic: appId }, () => {
                logger.info(`Новое сообщение ${request.params.widgetId}`);
                reply.event({ data: 'reload' });
            });
        }
        catch (error) {
            logger.info(error);
            reply(error);
        }
    },
};
exports.default = controller;
