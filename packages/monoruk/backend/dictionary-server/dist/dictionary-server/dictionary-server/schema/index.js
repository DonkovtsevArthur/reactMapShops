"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const schema = new Mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
    },
});
exports.default = schema;
