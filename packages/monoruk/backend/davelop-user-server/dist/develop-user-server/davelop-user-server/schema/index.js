"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const constants_1 = require("../../interfaces/constants");
const schema = new Mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: constants_1.VALID_STATUS,
        default: 'active',
    },
    apps: [String],
});
schema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.genSalt(constants_1.SALT_WORK_FACTOR, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err)
                return next(err);
            this.password = hash;
            next();
        });
    });
});
schema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
exports.default = schema;
