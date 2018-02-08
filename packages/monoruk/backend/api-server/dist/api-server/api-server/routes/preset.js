"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const preset = require("../controller/preset");
const docs_1 = require("../docs");
const userRoutes = [
    {
        method: 'POST',
        path: '/preset/{preset}',
        handler: preset.start,
        config: Object.assign({}, docs_1.runPreset, { auth: 'application', validate: {
                payload: {
                    orgId: Joi.string().required(),
                    datasourceId: Joi.string().required(),
                    token: Joi.string().optional(),
                },
            } }),
    },
];
exports.default = userRoutes;
