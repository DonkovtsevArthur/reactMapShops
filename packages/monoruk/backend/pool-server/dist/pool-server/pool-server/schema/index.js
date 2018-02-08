"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const constants_1 = require("../../interfaces/constants");
const schema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: constants_1.VALID_COLUMN_TYPE,
        required: true,
    },
});
exports.default = schema;
