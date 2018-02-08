"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const access_1 = require("../controller/access");
const constants_1 = require("../../interfaces/constants");
const userRoutes = [
    {
        method: 'POST',
        path: '/access/share',
        handler: access_1.default.share,
        config: {
            auth: 'application',
            validate: {
                payload: {
                    orgId: Joi.string().required(),
                    apps: Joi.array().items(Joi.object().keys({
                        appId: Joi.string().required(),
                        appType: Joi.string().valid(constants_1.ACCESS_VALID_TYPE).required(),
                    })),
                },
            },
        },
    },
    {
        method: 'POST',
        path: '/access/openShare',
        handler: access_1.default.openShare,
        config: {
            auth: 'application',
            validate: {
                payload: {
                    accessToken: Joi.string().required(),
                    orgId: Joi.string().required(),
                },
            },
        },
    },
    {
        method: 'POST',
        path: '/access/closeShare',
        handler: access_1.default.closeShare,
        config: {
            auth: 'application',
            validate: {
                payload: {
                    accessToken: Joi.string().required(),
                    orgId: Joi.string().required(),
                },
            },
        },
    },
    {
        method: 'POST',
        path: '/access/removeShare',
        handler: access_1.default.removeShare,
        config: {
            auth: 'application',
            validate: {
                payload: {
                    accessToken: Joi.string().required(),
                    orgId: Joi.string().required(),
                },
            },
        },
    },
    {
        method: 'POST',
        path: '/access/getShareToApp',
        handler: access_1.default.getShareToApp,
        config: {
            auth: 'application',
            validate: {
                payload: {
                    appId: Joi.string().required(),
                    orgId: Joi.string().required(),
                },
            },
        },
    },
    {
        method: 'POST',
        path: '/access/copy',
        handler: access_1.default.copy,
        config: {
            auth: 'application',
            validate: {
                payload: {
                    orgId: Joi.string().required(),
                    accessToken: Joi.string().required(),
                    alias: Joi.string().required(),
                    group: Joi.string().required(),
                },
            },
        },
    },
];
exports.default = userRoutes;
