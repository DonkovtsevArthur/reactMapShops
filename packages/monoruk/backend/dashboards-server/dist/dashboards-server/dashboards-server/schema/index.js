"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const widget = new Mongoose.Schema({
    i: {
        type: String,
        required: true,
    },
    local: {
        type: Boolean,
        default: false,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    w: {
        type: Number,
        required: true,
    },
    h: {
        type: Number,
        required: true,
    },
    minW: {
        type: Number,
        default: 3,
    },
    minH: {
        type: Number,
        default: 3,
    },
    url: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    original: {
        type: String,
        default: undefined,
    },
});
const schema = new Mongoose.Schema({
    orgId: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    copy: {
        type: Boolean,
        default: undefined,
    },
    group: {
        type: String,
        default: undefined,
    },
    widgets: [widget],
});
exports.default = schema;
