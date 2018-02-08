"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../interfaces/core");
const Logger = require("pino");
const logger = Logger();
async function addDataSource(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'addDataSource', timeout$: 5000 };
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
exports.addDataSource = addDataSource;
async function removeDataSource(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'removeDataSource' };
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
exports.removeDataSource = removeDataSource;
async function getAllDataSource(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'getAllDataSource' };
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
exports.getAllDataSource = getAllDataSource;
async function addWidget(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'addWidget' };
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
exports.addWidget = addWidget;
async function removeWidget(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'removeWidget' };
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
exports.removeWidget = removeWidget;
async function setStatusUserApp(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'setStatus' };
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
exports.setStatusUserApp = setStatusUserApp;
async function get(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'get' };
        const hemera = request.hemera();
        const appId = request.payload.appId;
        const client = new core_1.HemeraClient(hemera, path, { appId });
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.get = get;
async function getConfig(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'getConfig' };
        const hemera = request.hemera();
        const credentials = request.auth.credentials;
        const client = new core_1.HemeraClient(hemera, path, Object.assign({}, credentials));
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.getConfig = getConfig;
async function put(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'put' };
        const hemera = request.hemera();
        const userAppId = request.auth.credentials.userAppId;
        const payload = request.payload;
        const client = new core_1.HemeraClient(hemera, path, { userAppId, groups: payload });
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.put = put;
async function getUserToken(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'getUserToken' };
        const hemera = request.hemera();
        const appId = request.payload.appId;
        const client = new core_1.HemeraClient(hemera, path, { appId });
        const result = await client.act();
        reply(result);
    }
    catch (error) {
        logger.info(error);
        reply(error);
    }
}
exports.getUserToken = getUserToken;
async function copy(request, reply) {
    try {
        const path = { topic: 'userApp', cmd: 'copyApp' };
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
exports.copy = copy;
