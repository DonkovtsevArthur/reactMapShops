"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status[Status["ok"] = 0] = "ok";
    Status[Status["undefinedError"] = 1] = "undefinedError";
})(Status = exports.Status || (exports.Status = {}));
class HemeraClient {
    constructor(hemera, path, payload) {
        this.hemera = null;
        this.hemera = hemera;
        this.path = path;
        this.payload = payload;
    }
    async act() {
        if (this.hemera === null) {
            throw new Error('Hemera not initialized');
        }
        else {
            if (this.payload.cmd || this.payload.topic) {
                throw new Error(`Can't use 'cmd' or 'topic' in hemera payload: ${this.payload}`);
            }
            this.path.payload = this.payload;
            this.path.timeout$ = 20000;
            console.log('Hemera calling', this.path);
            return this.hemera.act(this.path);
        }
    }
}
exports.HemeraClient = HemeraClient;
