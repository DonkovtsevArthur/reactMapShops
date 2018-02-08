export function getColumnsNumber(db: string): string {
  return `
    SELECT count(*) as num FROM system.columns WHERE database='${db}'
  `;
}

export function addColumn(name: string, type: string): string {
  return `
    ALTER TABLE documents ADD COLUMN ${name} ${type}
  `;
}