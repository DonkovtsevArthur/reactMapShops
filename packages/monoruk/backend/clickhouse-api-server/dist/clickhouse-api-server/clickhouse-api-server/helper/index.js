"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniq = require("lodash/uniq");
const flatten = require("lodash/flatten");
function findColumns(groups, param) {
    let column = 'not_found';
    groups.some((group) => {
        return group.items.some((item) => {
            if (item.name === param) {
                column = item.column;
                return true;
            }
            return false;
        });
    });
    return column;
}
exports.findColumns = findColumns;
function queryGenerator(orgId, query, groups) {
    const selected = groups.map((group) => {
        return group.items.map((item) => {
            return `${item.column} as ${item.name}`;
        });
    });
    const uniqSelected = uniq(flatten(selected));
    const under = `(SELECT ${uniqSelected.join(', ')} FROM documents WHERE orgId='${orgId}')`;
    return query.replace(/dataSource/g, under);
}
exports.queryGenerator = queryGenerator;
function queryGeneratorAll(orgIds, query, groups) {
    const selected = groups.map((group) => {
        return group.items.map((item) => {
            return `${item.column} as ${item.name}`;
        });
    });
    const whereString = orgIds.map(item => `orgId='${item}'`);
    const where = whereString.join(' OR ');
    console.info('where', where);
    const uniqSelected = uniq(flatten(selected));
    const under = `(SELECT orgId, ${uniqSelected.join(', ')} FROM documents WHERE ${where})`;
    return query.replace(/all/g, under);
}
exports.queryGeneratorAll = queryGeneratorAll;
