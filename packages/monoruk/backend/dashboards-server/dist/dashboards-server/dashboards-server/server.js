"use strict";
// require('dotenv').config();
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Mongoose = require("mongoose");
const schema_1 = require("./schema");
// nats
const Nats = require("nats");
const Hemera = require("nats-hemera");
const HemeraZipkin = require("hemera-zipkin");
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
                resolve(Mongoose.model('dashboard', schema_1.default));
            });
        });
    }
    natsConnect(model) {
        this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
        this.hemera = new Hemera(this.nats, {
            logLevel: 'debug',
            childLogger: true,
            tag: 'dashboard-service',
        });
        this.hemera.use(HemeraZipkin, {
            host: process.env.ZIPKIN_HOST,
            sampling: 1,
            subscriptionBased: false,
            path: '/api/v1/spans',
            debug: false,
        });
        this.hemera.ready(() => {
            this.hemera.add({ topic: 'dashboard', cmd: 'add' }, (req, res) => {
                controllers.add(req.payload, res, model, this.hemera);
            });
            this.hemera.add({ topic: 'dashboard', cmd: 'getAll' }, (req, res) => {
                controllers.getAll(req.payload, res, model);
            });
            this.hemera.add({ topic: 'dashboard', cmd: 'get' }, (req, res) => {
                controllers.get(req.payload, res, model);
            });
            this.hemera.add({ topic: 'dashboard', cmd: 'addWidget' }, (req, res) => {
                controllers.addWidget(req.payload, res, model);
            });
            this.hemera.add({ topic: 'dashboard', cmd: 'removeWidget' }, (req, res) => {
                controllers.removeWidget(req.payload, res, model);
            });
            this.hemera.add({ topic: 'dashboard', cmd: 'remove' }, (req, res) => {
                controllers.remove(req.payload, res, model, this.hemera);
            });
            this.hemera.add({ topic: 'dashboard', cmd: 'place' }, (req, res) => {
                controllers.place(req.payload, res, model);
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
