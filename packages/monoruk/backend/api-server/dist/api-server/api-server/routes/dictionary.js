"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const dictionary_1 = require("../controller/dictionary");
const appRoutes = [
    {
        method: 'PUT',
        path: '/dictionary/{dictionary}',
        handler: dictionary_1.default.save,
        config: {
            auth: 'lkUserWrite',
            validate: {
                payload: Joi.array().items(Joi.object().keys({
                    id: Joi.string().required(),
                    value: Joi.string().required(),
                })).required(),
            },
        },
    },
];
exports.default = appRoutes;
