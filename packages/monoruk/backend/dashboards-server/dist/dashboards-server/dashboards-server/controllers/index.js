"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Logger = require("pino");
const core_1 = require("../../interfaces/core");
const logger = Logger();
async function add(payload, response, model, hemera) {
    try {
        const { orgId, alias, copy, group } = payload;
        logger.info('add dashboard', orgId, alias);
        await model.update({
            orgId,
        }, {
            $set: {
                active: false,
            },
        }, {
            multi: true,
        });
        const dashboard = await model.create({ copy, orgId, alias, group, active: true });
        logger.info('dashboard created', dashboard);
        const appPath = { topic: 'user', cmd: 'addDashboard' };
        const data = { orgId, dashboardId: dashboard._id };
        const clientApp = new core_1.HemeraClient(hemera, appPath, data);
        await clientApp.act();
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.add = add;
async function getAll(payload, response, model) {
    try {
        const { orgId } = payload;
        const dashboards = await model.find({ orgId }).select({
            __v: 0,
            widgets: 0,
            orgId: 0,
        });
        console.log('dashboards', dashboards);
        response(null, dashboards);
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.getAll = getAll;
async function get(payload, response, model) {
    try {
        const { dashboardId, orgId } = payload;
        await model.update({ $and: [
                { orgId },
            ] }, {
            $set: { active: false },
        }, {
            multi: true,
        });
        const dashboard = await model.findOneAndUpdate({
            $and: [
                { _id: dashboardId },
                { orgId },
            ],
        }, {
            $set: { active: true },
        }, {
            new: true,
        }).select({
            __v: 0,
            orgId: 0,
        });
        response(null, dashboard);
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.get = get;
async function addWidget(payload, response, model) {
    try {
        const { widgetCfg, orgId } = payload;
        const result = await model.findOneAndUpdate({
            $and: [
                { active: true },
                { orgId },
            ],
        }, {
            $push: {
                widgets: widgetCfg,
            },
        }, {
            returnNewDocument: true,
        });
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.addWidget = addWidget;
async function removeWidget(payload, response, model) {
    try {
        const { appId, dashboardId } = payload;
        await model.findByIdAndUpdate(dashboardId, { $pull: { widgets: { i: appId } } });
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.removeWidget = removeWidget;
async function place(payload, response, model) {
    try {
        const { place } = payload;
        await Promise.all(place.map(async (widget) => {
            return model.findOneAndUpdate({ 'widgets.i': widget.i }, { $set: {
                    'widgets.$.x': widget.x,
                    'widgets.$.y': widget.y,
                    'widgets.$.w': widget.w,
                    'widgets.$.h': widget.h,
                } });
        }));
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.place = place;
async function remove(payload, response, model, hemera) {
    try {
        const { dashboardId } = payload;
        const dashboard = await model.findById(dashboardId);
        const widgets = dashboard.widgets;
        await Promise.all(widgets.map(async (widget) => {
            const removeAppInUserPath = { topic: 'userApp', cmd: 'removeWidget' };
            const clientRemoveApp = new core_1.HemeraClient(hemera, removeAppInUserPath, {
                dashboardId,
                appId: widget.original || widget.i,
            });
            return clientRemoveApp.act();
        }));
        await model.remove({ _id: dashboardId });
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.remove = remove;
