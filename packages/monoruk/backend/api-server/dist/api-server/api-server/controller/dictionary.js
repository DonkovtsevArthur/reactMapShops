"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
const controller = {
    async save(request, reply) {
        try {
            const path = { topic: 'dictionary', cmd: 'create' };
            const hemera = request.hemera();
            const credentials = request.auth.credentials;
            const payload = request.payload;
            const dictionary = request.params.dictionary;
            const data = Object.assign({ dictionary, data: payload }, credentials);
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
