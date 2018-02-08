"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const app_1 = require("../controller/app");
const docs_1 = require("../docs");
const constants_1 = require("../../interfaces/constants");
const appRoutes = [
    {
        method: 'POST',
        path: '/app/get',
        handler: app_1.default.get,
        config: Object.assign({}, docs_1.getAppDoc, { auth: 'developUser', validate: {
                payload: {
                    name: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'GET',
        path: '/app/getAll',
        handler: app_1.default.getAll,
        config: Object.assign({}, docs_1.getAllAppDoc, { auth: 'application' }),
    },
    {
        method: 'POST',
        path: '/app/add',
        handler: app_1.default.add,
        config: Object.assign({}, docs_1.addAppDoc, { auth: 'developUser', validate: {
                payload: {
                    name: Joi.string().required(),
                    type: Joi.string().valid(constants_1.VALID_APPS_TYPE).required(),
                    alias: Joi.string().required(),
                    groups: Joi.array().items(Joi.object().keys({
                        name: Joi.string().required(),
                        alias: Joi.string().required(),
                        period: Joi.string().valid(constants_1.VALID_PERIOD).required(),
                        items: Joi.array().items(Joi.object().keys({
                            name: Joi.string().required(),
                            alias: Joi.string().required(),
                            type: Joi.string().valid(constants_1.VALID_TYPE).required(),
                            businessType: Joi.string().valid(constants_1.VALID_BUSINESS_TYPE).required(),
                            system: Joi.boolean().required(),
                            needDirectory: Joi.boolean().required(),
                        })),
                        extras: Joi.object(),
                    })).when('type', {
                        is: constants_1.DATA_SOURCE,
                        then: Joi.any().required(),
                        otherwise: Joi.any().optional(),
                    }),
                    settings: Joi.object().when('type', {
                        is: constants_1.WIDGET,
                        then: Joi.any().required(),
                        otherwise: Joi.any().optional(),
                    }),
                },
            } }),
    },
    {
        method: 'PUT',
        path: '/app/update',
        handler: app_1.default.update,
        config: Object.assign({}, docs_1.updateAppDoc, { auth: 'developUser', validate: {
                payload: {
                    name: Joi.string().required(),
                    type: Joi.string().valid(constants_1.VALID_APPS_TYPE).required(),
                    alias: Joi.string().required(),
                    groups: Joi.array().items(Joi.object().keys({
                        name: Joi.string().required(),
                        alias: Joi.string().required(),
                        period: Joi.string().valid(constants_1.VALID_PERIOD).required(),
                        items: Joi.array().items(Joi.object().keys({
                            name: Joi.string().required(),
                            alias: Joi.string().required(),
                            type: Joi.string().valid(constants_1.VALID_TYPE).required(),
                            businessType: Joi.string().valid(constants_1.VALID_BUSINESS_TYPE).required(),
                            system: Joi.boolean().required(),
                            needDirectory: Joi.boolean().required(),
                        })),
                        extras: Joi.object(),
                    })).when('type', {
                        is: constants_1.DATA_SOURCE,
                        then: Joi.any().required(),
                        otherwise: Joi.any().optional(),
                    }),
                    settings: Joi.object().when('type', {
                        is: constants_1.WIDGET,
                        then: Joi.any().required(),
                        otherwise: Joi.any().optional(),
                    }),
                },
            } }),
    },
    {
        method: 'DELETE',
        path: '/app/remove',
        handler: app_1.default.remove,
        config: Object.assign({}, docs_1.deleteAppDoc, { auth: 'developUser', validate: {
                payload: {
                    name: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/app/status',
        handler: app_1.default.status,
        config: Object.assign({}, docs_1.setStatusDoc, { auth: 'application', validate: {
                payload: {
                    name: Joi.string().required(),
                    developId: Joi.string().required(),
                    status: Joi.string().valid(constants_1.VALID_STATUS).required(),
                },
            } }),
    },
];
exports.default = appRoutes;
