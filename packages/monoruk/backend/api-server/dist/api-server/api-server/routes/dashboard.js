"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const dashboard = require("../controller/dashboard");
const docs_1 = require("../docs");
const dashboardRoutes = [
    {
        method: 'POST',
        path: '/dashboard/add',
        handler: dashboard.add,
        config: Object.assign({}, docs_1.addDashboardDoc, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                    alias: Joi.string().required(),
                    group: Joi.string().optional(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/dashboard/getAll',
        handler: dashboard.getAll,
        config: Object.assign({}, docs_1.getAllDashboardDoc, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/dashboard/get',
        handler: dashboard.get,
        config: Object.assign({}, docs_1.getDashboardDoc, { auth: 'application', validate: {
                payload: {
                    dashboardId: Joi.string().required(),
                    orgId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/dashboard/remove',
        handler: dashboard.remove,
        config: Object.assign({}, docs_1.getDashboardDoc, { auth: 'application', validate: {
                payload: {
                    dashboardId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/dashboard/place',
        handler: dashboard.place,
        config: Object.assign({}, docs_1.placeDashboardDoc, { auth: 'application', validate: {
                payload: {
                    place: Joi.array().items(Joi.object().keys({
                        i: Joi.string().required(),
                        w: Joi.number().required(),
                        h: Joi.number().required(),
                        y: Joi.number().required(),
                        x: Joi.number().required(),
                        isDraggable: Joi.any(),
                        isResizable: Joi.any(),
                        maxH: Joi.any(),
                        maxW: Joi.any(),
                        minH: Joi.any(),
                        minW: Joi.any(),
                        moved: Joi.any(),
                        static: Joi.any(),
                    })),
                },
            } }),
    },
];
exports.default = dashboardRoutes;
