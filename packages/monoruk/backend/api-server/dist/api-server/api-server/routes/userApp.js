"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const userApp = require("../controller/userApp");
const docs_1 = require("../docs");
const constants_1 = require("../../interfaces/constants");
const userAppRoutes = [
    {
        method: 'POST',
        path: '/userApp/addDataSource',
        handler: userApp.addDataSource,
        config: Object.assign({}, docs_1.addDataSourceDoc, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                    appId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/userApp/removeDataSource',
        handler: userApp.removeDataSource,
        config: Object.assign({}, docs_1.removeDataSourceDoc, { auth: 'application', validate: {
                payload: {
                    appId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/userApp/getAllDataSource',
        handler: userApp.getAllDataSource,
        config: Object.assign({}, docs_1.getAllDataSourceDoc, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/userApp/addWidget',
        handler: userApp.addWidget,
        config: Object.assign({}, docs_1.addWidgetpDoc, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                    appId: Joi.string().required(),
                    dataSourceId: Joi.string().required(),
                    place: {
                        x: Joi.number().required(),
                        y: Joi.number().required(),
                    },
                },
            } }),
    },
    {
        method: 'POST',
        path: '/userApp/removeWidget',
        handler: userApp.removeWidget,
        config: Object.assign({}, docs_1.removeWidgetDoc, { auth: 'application', validate: {
                payload: {
                    appId: Joi.string().required(),
                    dashboardId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/userApp/setStatus',
        handler: userApp.setStatusUserApp,
        config: Object.assign({}, docs_1.setStatusUserAppDoc, { auth: 'application', validate: {
                payload: {
                    appId: Joi.string().required(),
                    status: Joi.string().valid(constants_1.VALID_STATUS).required(),
                },
            } }),
    },
    {
        method: 'GET',
        path: '/userApp/getConfig',
        handler: userApp.getConfig,
        config: Object.assign({}, docs_1.getUserConfigDoc, { auth: 'lkUserRead' }),
    },
    {
        method: 'POST',
        path: '/userApp/get',
        handler: userApp.get,
        config: Object.assign({}, docs_1.getUserAppDoc, { auth: 'application', validate: {
                payload: {
                    appId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/userApp/getUserToken',
        handler: userApp.getUserToken,
        config: Object.assign({}, docs_1.getUserTokenDoc, { auth: 'application', validate: {
                payload: {
                    appId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'PUT',
        path: '/userApp/put',
        handler: userApp.put,
        config: Object.assign({}, docs_1.putUserAppDoc, { auth: 'application', validate: {
                payload: Joi.array().items(Joi.object().keys({
                    name: Joi.string().required(),
                    alias: Joi.string().required(),
                    period: Joi.string().required(),
                    items: Joi.array().items(Joi.object().keys({
                        name: Joi.string().required(),
                        alias: Joi.string().required(),
                        type: Joi.string().valid(constants_1.VALID_TYPE).required(),
                        businessType: Joi.string().valid(constants_1.VALID_BUSINESS_TYPE).required(),
                    })),
                    extras: Joi.object(),
                })),
            } }),
    },
    {
        method: 'POST',
        path: '/userApp/copy',
        handler: userApp.copy,
        config: Object.assign({}, docs_1.getUserTokenDoc, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                    appId: Joi.string().required(),
                },
            } }),
    },
];
exports.default = userAppRoutes;
