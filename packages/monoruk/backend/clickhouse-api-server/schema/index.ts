export function createTable(db) {
  return `
    CREATE TABLE IF NOT EXISTS ${db}.documents
    (
      orgId String,
      date Date
    ) ENGINE = MergeTree(date, (date, orgId), 8192)
  `;
}

export function createDb(db) {
  return `
    CREATE DATABASE IF NOT EXISTS ${db}
  `;
}