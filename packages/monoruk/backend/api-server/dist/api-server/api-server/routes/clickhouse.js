"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const clickhouse = require("../controller/clickhouse");
const docs_1 = require("../docs");
const clickhouseRoutes = [
    {
        method: 'POST',
        path: '/data',
        handler: clickhouse.data,
        config: Object.assign({}, docs_1.dataClickhouse, { auth: 'lkUserWrite' }),
    },
    {
        method: 'POST',
        path: '/data/get',
        handler: clickhouse.getData,
        config: Object.assign({}, docs_1.getDataClickhouse, { auth: 'lkUserRead', validate: {
                payload: {
                    query: Joi.string().required(),
                },
            } }),
    },
];
exports.default = clickhouseRoutes;
