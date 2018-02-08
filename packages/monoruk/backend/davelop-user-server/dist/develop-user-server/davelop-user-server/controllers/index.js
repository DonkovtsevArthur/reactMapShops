"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Logger = require("pino");
const jsonwebtoken = require("jsonwebtoken");
const logger = Logger();
async function login(payload, response, model) {
    try {
        const login = payload.login;
        const password = payload.password;
        const user = await model.findOne({ login });
        if (!user) {
            response(Boom.notFound());
            return;
        }
        const compare = await user.comparePassword(password);
        if (compare) {
            const token = jsonwebtoken.sign({ developId: user._id }, process.env.JWT_SECRET);
            response(null, { token });
        }
        else {
            throw new Error('Неверный логин или пароль');
        }
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.login = login;
async function add(payload, response, model) {
    try {
        const login = payload.login;
        const user = await model.findOne({ login });
        if (user) {
            response(Boom.conflict());
            return;
        }
        const newUser = await model.create(payload);
        const token = jsonwebtoken.sign({ developId: newUser._id }, process.env.JWT_SECRET);
        response(null, { token });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.add = add;
async function appAdd(payload, response, model) {
    try {
        const developId = payload.developId;
        const appId = payload.appId;
        const user = await model.findOne({ _id: developId });
        if (!user) {
            response(Boom.badRequest());
            return;
        }
        await user.update({ $push: { apps: appId } });
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.appAdd = appAdd;
async function appRemove(payload, response, model) {
    try {
        const developId = payload.developId;
        const appId = payload.appId;
        const user = await model.findOne({ _id: developId });
        if (!user) {
            response(Boom.badRequest());
            return;
        }
        await user.update({ $pull: { apps: appId } });
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.appRemove = appRemove;
