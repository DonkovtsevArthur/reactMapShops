"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Logger = require("pino");
const uuid = require("uuid");
const core_1 = require("../../interfaces/core");
const logger = Logger();
async function share(payload, response, model, hemera) {
    try {
        const { orgId, apps } = payload;
        const accessToken = uuid.v4();
        const share = await model.create({
            accessToken,
            parent: orgId,
        });
        await Promise.all(apps.map(async (app) => {
            const path = { topic: 'userApp', cmd: 'verify' };
            const verify = new core_1.HemeraClient(hemera, path, { orgId, appId: app.appId });
            const resultVerify = await verify.act();
            if (!resultVerify) {
                return Promise.reject('Access denide');
            }
            return model.update({
                _id: share._id,
            }, {
                $push: {
                    apps: {
                        appId: app.appId,
                        appType: app.appType,
                    },
                },
            });
        }));
        response(null, share);
    }
    catch (error) {
        response(Boom.locked());
        logger.error(error);
    }
}
exports.share = share;
async function closeShare(payload, response, model, hemera) {
    try {
        const { accessToken, orgId } = payload;
        await model.findOneAndUpdate({
            $and: [
                { accessToken },
                { parent: orgId },
            ],
        }, {
            $set: {
                active: false,
            },
        });
        const path = { topic: 'userApp', cmd: 'setStatusByAccessToken' };
        const close = new core_1.HemeraClient(hemera, path, { accessToken, status: 'inactive' });
        await close.act();
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.closeShare = closeShare;
async function openShare(payload, response, model, hemera) {
    try {
        const { accessToken, orgId } = payload;
        await model.findOneAndUpdate({
            $and: [
                { accessToken },
                { parent: orgId },
            ],
        }, {
            $set: {
                active: true,
            },
        });
        const path = { topic: 'userApp', cmd: 'setStatusByAccessToken' };
        const open = new core_1.HemeraClient(hemera, path, { accessToken, status: 'active' });
        await open.act();
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.openShare = openShare;
async function removeShare(payload, response, model, hemera) {
    try {
        const { accessToken, orgId } = payload;
        await model.remove({
            $and: [
                { accessToken },
                { parent: orgId },
            ],
        });
        const path = { topic: 'userApp', cmd: 'removeByAccessToken' };
        const remove = new core_1.HemeraClient(hemera, path, { accessToken });
        await remove.act();
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.removeShare = removeShare;
async function getShareToApp(payload, response, model) {
    try {
        const { appId, orgId } = payload;
        const share = await model.find({
            $and: [
                { 'apps.appId': appId },
                { parent: orgId },
            ],
        });
        response(null, share);
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.getShareToApp = getShareToApp;
async function getShareToToken(payload, response, model) {
    try {
        const share = await model.findOne(payload);
        response(null, share);
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.getShareToToken = getShareToToken;
async function getParent(payload, response, model) {
    try {
        const { accessToken } = payload;
        const share = await model.findOne({ accessToken });
        response(null, share.parent);
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.getParent = getParent;
async function copy(payload, response, model, hemera) {
    try {
        const { accessToken, orgId, alias, group } = payload;
        const share = await model.findOne({ accessToken }).select({
            active: 1,
            apps: 1,
        });
        if (!share || !share.active) {
            response(Boom.resourceGone());
            return;
        }
        const path = { topic: 'preset', cmd: 'copyApps' };
        const copy = new core_1.HemeraClient(hemera, path, {
            alias,
            group,
            orgId,
            accessToken,
            apps: share.apps,
        });
        const copyVerify = await copy.act();
        response(null, copyVerify);
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.copy = copy;
