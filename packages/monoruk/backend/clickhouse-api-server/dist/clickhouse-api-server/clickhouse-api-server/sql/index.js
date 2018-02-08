"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getColumnsNumber(db) {
    return `
    SELECT count(*) as num FROM system.columns WHERE database='${db}'
  `;
}
exports.getColumnsNumber = getColumnsNumber;
function addColumn(name, type) {
    return `
    ALTER TABLE documents ADD COLUMN ${name} ${type}
  `;
}
exports.addColumn = addColumn;
