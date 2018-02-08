"use strict";
// require('dotenv').config();
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Mongoose = require("mongoose");
const schema_1 = require("./schema");
// nats
const Nats = require("nats");
const Hemera = require("nats-hemera");
// logger
const Logger = require("pino");
// controllers
const controllers = require("./controllers");
const logger = Logger();
class DevUser {
    constructor() {
        Mongoose.Promise = global.Promise;
        this.db = Mongoose.connection;
    }
    async start() {
        this.model = await this.mongoConnect();
        this.natsConnect(this.model);
    }
    mongoConnect() {
        this.db.on('error', () => logger.error('connection error'));
        Mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, { useMongoClient: true });
        return new Promise((resolve) => {
            this.db.once('open', () => {
                resolve(Mongoose.model('devUser', schema_1.default));
            });
        });
    }
    natsConnect(model) {
        this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
        this.hemera = new Hemera(this.nats, { logLevel: 'info' });
        this.hemera.ready(() => {
            this.hemera.add({ topic: 'develop', cmd: 'login' }, (req, res) => {
                controllers.login(req.payload, res, model);
            });
            this.hemera.add({ topic: 'develop', cmd: 'add' }, (req, res) => {
                controllers.add(req.payload, res, model);
            });
            this.hemera.add({ topic: 'develop', cmd: 'appAdd' }, (req, res) => {
                controllers.appAdd(req.payload, res, model);
            });
            this.hemera.add({ topic: 'develop', cmd: 'appRemove' }, (req, res) => {
                controllers.appRemove(req.payload, res, model);
            });
        });
    }
}
exports.DevUser = DevUser;
try {
    const devUser = new DevUser();
    const model = devUser.start();
}
catch (error) {
    logger.error(error);
}
