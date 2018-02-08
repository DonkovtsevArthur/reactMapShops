"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Logger = require("pino");
const bluebird = require("bluebird");
const moment = require("moment");
const jsonSql = require("json-sql");
const core_1 = require("../../interfaces/core");
const helper_1 = require("../helper");
const sql = require("../sql");
const logger = Logger();
const jsonParser = jsonSql({
    separatedValues: false,
    wrappedIdentifiers: false,
});
function getColumns(payload, response, model) {
    try {
        const db = process.env.CLICKHOUSE_DB || 'monitor';
        const type = payload.type === 'Booalen' ? 'Uint8' : payload.type;
        const resultStream = model.query(sql.getColumnsNumber(db));
        const result = [];
        resultStream.on('error', (error) => {
            logger.error(error);
            response(Boom.badImplementation(error.message));
        });
        resultStream.on('data', (row) => {
            result.push(row);
        });
        resultStream.on('end', async () => {
            const num = result[0].num;
            const columnName = `Column${num - 1}`;
            const query = bluebird.promisify(model.query, { context: model });
            const newColumn = await query(sql.addColumn(columnName, type));
            response(null, columnName);
        });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.getColumns = getColumns;
async function data(payload, response, model, hemera) {
    try {
        const db = process.env.CLICKHOUSE_DB || 'monitor';
        const data = payload.data;
        const app = payload.app;
        const groups = app.groups;
        const date = moment().format('YYYY-MM-DD');
        const result = data.map((row) => {
            const resultRow = { date, orgId: app.orgId };
            Object.keys(row).forEach((param) => {
                const column = helper_1.findColumns(groups, param);
                if (column === 'not_found') {
                    throw new Error('Формат данных не соответствует конфигурации');
                }
                resultRow[column] = row[param];
            });
            return resultRow;
        });
        logger.info('result --->', result);
        const sql = jsonParser.build({
            type: 'insert',
            table: 'documents',
            values: result,
        });
        const query = bluebird.promisify(model.query, { context: model });
        logger.info('query --->', sql.query);
        await query(sql.query);
        const path = { pubsub$: true, topic: app._id, cmd: 'reload' };
        const client = new core_1.HemeraClient(hemera, path, {});
        hemera.act({ pubsub$: true, topic: app._id, value: '1' });
        response(null, { status: 'ok' });
    }
    catch (error) {
        response(Boom.badImplementation());
        logger.error(error);
    }
}
exports.data = data;
async function getData(payload, response, model, hemera) {
    try {
        logger.info('get data from clickhouse');
        const db = process.env.CLICKHOUSE_DB || 'monitor';
        const query = payload.query;
        const app = payload.app;
        logger.info('app', app);
        const groups = app.groups;
        const noSelect = query.indexOf('SELECT') !== 0;
        const noDataSource = query.indexOf('dataSource') < 0;
        const noAll = query.indexOf(' all ') < 0;
        if (noSelect && (noDataSource || noAll)) {
            throw new Error('Неверный формат запроса');
        }
        let resultQuery = '';
        logger.info('noAll', noAll);
        if (!noAll) {
            const userPath = { topic: 'userApp', cmd: 'allOrgId' };
            const clientUser = new core_1.HemeraClient(hemera, userPath, { orgId: app.orgId });
            const orgIds = await clientUser.act();
            orgIds.push(app.orgId);
            resultQuery = helper_1.queryGeneratorAll(orgIds, query, groups);
        }
        else {
            resultQuery = helper_1.queryGenerator(app.orgId, query, groups);
        }
        logger.info('------ query', resultQuery);
        const resultStream = model.query(resultQuery);
        const result = [];
        resultStream.on('error', (error) => {
            logger.error(error);
            response(Boom.badImplementation(error.message));
        });
        resultStream.on('data', (row) => {
            result.push(row);
        });
        resultStream.on('end', async () => {
            response(null, result);
        });
    }
    catch (error) {
        response(Boom.badRequest());
        logger.error(error);
    }
}
exports.getData = getData;
