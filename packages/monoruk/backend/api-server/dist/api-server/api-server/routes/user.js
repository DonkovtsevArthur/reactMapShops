"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const user = require("../controller/user");
const docs_1 = require("../docs");
const userRoutes = [
    {
        method: 'POST',
        path: '/user/add',
        handler: user.add,
        config: Object.assign({}, docs_1.addLkUser, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/user/changeStatus',
        handler: user.changeStatus,
        config: Object.assign({}, docs_1.changeStatus, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                    status: Joi.string().required(),
                },
            } }),
    },
];
exports.default = userRoutes;
