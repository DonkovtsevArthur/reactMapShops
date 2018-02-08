"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const constants_1 = require("../../interfaces/constants");
const app = new Mongoose.Schema({
    appId: {
        type: String,
        required: true,
    },
    appType: {
        type: String,
        enum: constants_1.ACCESS_VALID_TYPE,
        required: true,
    },
});
const schema = new Mongoose.Schema({
    parent: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    apps: [app],
});
exports.default = schema;
