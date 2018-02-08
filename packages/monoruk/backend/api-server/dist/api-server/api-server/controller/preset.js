"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
async function start(request, reply) {
    try {
        const orgId = request.payload.orgId;
        const datasourceId = request.payload.datasourceId;
        const token = request.payload.token;
        const preset = request.params.preset;
        const path = { topic: 'preset', cmd: preset, timeout$: 5000 };
        const hemera = request.hemera();
        const client = new core_1.HemeraClient(hemera, path, { orgId, datasourceId, preset, token });
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.start = start;
