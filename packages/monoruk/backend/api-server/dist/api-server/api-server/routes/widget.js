"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const widget_1 = require("../controller/widget");
const constants_1 = require("../../interfaces/constants");
const widgetRoutes = [
    {
        method: 'GET',
        path: '/widget/{appId}',
        handler: widget_1.default.get,
        config: {
            auth: 'application',
        },
    },
    {
        method: 'POST',
        path: '/widget/update',
        handler: widget_1.default.update,
        config: {
            auth: 'application',
            validate: {
                payload: {
                    appId: Joi.string().required(),
                    index: Joi.string().allow('').optional(),
                    section: Joi.string().allow('').optional(),
                    graph: Joi.string().allow('').required(),
                    group: Joi.string().allow('').required(),
                    indexAction: Joi.string().valid(constants_1.INDEX_ACTIONS).required(),
                    secondIndexAction: Joi.string().valid(constants_1.INDEX_ACTIONS).optional(),
                    dateStart: Joi.date().optional(),
                    dateEnd: Joi.date().optional(),
                    color: Joi.string().optional(),
                    period: Joi.string().valid(constants_1.PERIOD).optional(),
                    formula: Joi.array().items(Joi.string()).optional(),
                },
            },
        },
    },
    {
        method: 'GET',
        path: '/widget/{appId}/events',
        handler: widget_1.default.events,
    },
];
exports.default = widgetRoutes;
