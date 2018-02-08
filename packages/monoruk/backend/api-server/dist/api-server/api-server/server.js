"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config();
const Hapi = require("hapi");
// plugins
const AuthBearer = require("hapi-auth-bearer-token");
const AuthJwt = require("hapi-auth-jwt2");
const Logger = require("pino");
const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const Susie = require("susie");
const Good = require("good");
// mq
const nats_1 = require("nats");
const Hemera = require("nats-hemera");
const HemeraZipkin = require("hemera-zipkin");
// auth
const application_1 = require("./auth/application");
const developUser_1 = require("./auth/developUser");
const core_1 = require("../interfaces/core");
// routes
const app_1 = require("./routes/app");
const develop_1 = require("./routes/develop");
const user_1 = require("./routes/user");
const userApp_1 = require("./routes/userApp");
const clickhouse_1 = require("./routes/clickhouse");
const dashboard_1 = require("./routes/dashboard");
const widget_1 = require("./routes/widget");
const dictionary_1 = require("./routes/dictionary");
const preset_1 = require("./routes/preset");
const access_1 = require("./routes/access");
const logger = Logger();
const goodOptions = {
    includes: {
        request: ['headers'],
        response: ['payload'],
    },
    reporters: {
        logstash: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ response: '*', request: '*' }],
            }, {
                module: 'good-hapi-graylog2',
                args: [{
                        host: process.env.GRAYLOG_HOST,
                        port: process.env.GRAYLOG_PORT,
                        facility: `monitor-api-${process.env.GRAYLOG_TYPE}`,
                        hostname: 'monitor',
                        bufferSize: 15625,
                    }],
            }],
    },
};
class Server {
    constructor(port) {
        this.port = port;
        this.options = {
            info: {
                title: 'API Сервера конфигураций',
                version: '0.0.1',
            },
            grouping: 'tags',
        };
    }
    start() {
        try {
            const server = new Hapi.Server();
            server.connection({ port: this.port, routes: { cors: true } });
            server.register([
                AuthBearer,
                AuthJwt,
                Inert,
                Vision,
                Susie,
                {
                    options: this.options,
                    register: HapiSwagger,
                },
                {
                    register: Good,
                    options: goodOptions,
                },
            ], async () => {
                server.auth.strategy('application', 'bearer-access-token', {
                    validateFunc: application_1.default,
                });
                server.auth.strategy('developUser', 'jwt', {
                    key: process.env.JWT_SECRET,
                    verifyOptions: { algorithms: ['HS256'] },
                    validateFunc: developUser_1.default,
                });
                server.auth.strategy('lkUserRead', 'bearer-access-token', {
                    validateFunc: async (token, callback) => {
                        const path = { topic: 'userApp', cmd: 'authorizationRead' };
                        const client = new core_1.HemeraClient(hemera, path, { token });
                        const app = await client.act();
                        if (app) {
                            callback(null, true, app);
                        }
                        else {
                            callback(null, false);
                        }
                    },
                });
                server.auth.strategy('lkUserWrite', 'bearer-access-token', {
                    validateFunc: async (token, callback) => {
                        const path = { topic: 'userApp', cmd: 'authorizationWrite' };
                        const client = new core_1.HemeraClient(hemera, path, { token });
                        const app = await client.act();
                        if (app) {
                            callback(null, true, app);
                        }
                        else {
                            callback(null, false);
                        }
                    },
                });
                const nats = nats_1.connect(process.env.NATS || 'nats://172.17.0.2:4222');
                const hemera = new Hemera(nats, {
                    logLevel: 'debug',
                    childLogger: true,
                    tag: 'api-service',
                });
                hemera.use(HemeraZipkin, {
                    host: process.env.ZIPKIN_HOST,
                    sampling: 1,
                    subscriptionBased: false,
                    path: '/api/v1/spans',
                    debug: false,
                });
                server.decorate('request', 'hemera', () => hemera);
                server.route(app_1.default);
                server.route(develop_1.default);
                server.route(user_1.default);
                server.route(userApp_1.default);
                server.route(clickhouse_1.default);
                server.route(dashboard_1.default);
                server.route(widget_1.default);
                server.route(dictionary_1.default);
                server.route(preset_1.default);
                server.route(access_1.default);
                await server.start();
                logger.info('Server running at:', server.info.uri);
            });
        }
        catch (error) {
            logger.error(error);
        }
    }
}
exports.default = Server;
const server = new Server(process.env.PORT || '5000');
server.start();
