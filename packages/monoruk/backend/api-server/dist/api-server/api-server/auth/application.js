"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (token, callback) => {
    if (token === process.env.CONFIG_SERVER_TOKEN) {
        return callback(null, true, {});
    }
    return callback(null, false, {});
};
