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
class Pool {
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
                resolve(Mongoose.model('pool', schema_1.default));
            });
        });
    }
    natsConnect(model) {
        this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
        this.hemera = new Hemera(this.nats, { logLevel: 'info' });
        this.hemera.ready(() => {
            this.hemera.add({ topic: 'pool', cmd: 'get' }, (req, res) => {
                controllers.get(req.payload, res, model);
            });
            this.hemera.add({ topic: 'pool', cmd: 'add' }, (req, res) => {
                controllers.add(req.payload, res, model);
            });
        });
    }
}
try {
    const pool = new Pool();
    const model = pool.start();
}
catch (error) {
    logger.error(error);
}
