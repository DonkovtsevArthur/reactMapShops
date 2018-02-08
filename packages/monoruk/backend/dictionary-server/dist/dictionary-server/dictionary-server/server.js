"use strict";
// require('dotenv').config();
Object.defineProperty(exports, "__esModule", { value: true });
// db
const Mongoose = require("mongoose");
// nats
const Nats = require("nats");
const Hemera = require("nats-hemera");
// logger
const Logger = require("pino");
// controllers
const controllers = require("./controllers");
const logger = Logger();
class Dictionary {
    constructor() {
        Mongoose.Promise = global.Promise;
        this.db = Mongoose.connection;
    }
    async start() {
        this.mongoConnect();
        this.natsConnect(this.db);
    }
    mongoConnect() {
        this.db.on('error', () => logger.error('connection error'));
        Mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, { useMongoClient: true });
    }
    natsConnect(db) {
        this.nats = Nats.connect(process.env.NATS || 'nats://172.17.0.2:4222');
        this.hemera = new Hemera(this.nats, { logLevel: 'info' });
        this.hemera.ready(() => {
            this.hemera.add({ topic: 'dictionary', cmd: 'create' }, (req, res) => {
                controllers.create(req.payload, res, db);
            });
            this.hemera.add({ topic: 'dictionary', cmd: 'update' }, (req, res) => {
                controllers.update(req.payload, res, db);
            });
        });
    }
}
try {
    const dictionary = new Dictionary();
    dictionary.start();
}
catch (error) {
    logger.error(error);
}
