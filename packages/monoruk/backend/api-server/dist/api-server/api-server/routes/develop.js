"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const develop = require("../controller/develop");
const docs_1 = require("../docs");
const developerRoutes = [
    {
        method: 'POST',
        path: '/develop/add',
        handler: develop.add,
        config: Object.assign({}, docs_1.addAdminUser, { auth: 'application', validate: {
                payload: {
                    login: Joi.string().required(),
                    password: Joi.string().required(),
                },
            } }),
    },
    {
        method: 'POST',
        path: '/develop/login',
        handler: develop.login,
        config: Object.assign({}, docs_1.loginAdminUser, { validate: {
                payload: {
                    login: Joi.string().required(),
                    password: Joi.string().required(),
                },
            } }),
    },
];
exports.default = developerRoutes;
