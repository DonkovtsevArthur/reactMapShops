"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createTable(db) {
    return `
    CREATE TABLE IF NOT EXISTS ${db}.documents
    (
      orgId String,
      date Date
    ) ENGINE = MergeTree(date, (date, orgId), 8192)
  `;
}
exports.createTable = createTable;
function createDb(db) {
    return `
    CREATE DATABASE IF NOT EXISTS ${db}
  `;
}
exports.createDb = createDb;
