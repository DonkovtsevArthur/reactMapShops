import * as Logger from 'pino';
import { HemeraClient, HemeraPath } from '../../interfaces/core';

const logger = Logger();

async function generateColumn(type, hemera, temp) {
  const promises = Object.keys(temp).map(async item => await temp[item]);
  await Promise.all(promises);
  logger.info(`Генерация новой колонки типа ${type}`);
  const path: HemeraPath = { topic: 'clickhouse', cmd: 'getColumns' };
  const client = new HemeraClient(hemera, path, { type });
  const name = await client.act();
  const poolPath: HemeraPath = { topic: 'pool', cmd: 'add' };
  const clientPool = new HemeraClient(hemera, poolPath, {
    type,
    name,
  });
  await clientPool.act();
  return name;
}

export async function assignColumns(groups, columns, temp: any = {}, hemera) {
  const assignUserApp = Promise.all(groups.map(async (group) => {
    const newItems = await Promise.all(group.items.map(async (item) => {
      if (temp[item.name]) {
        return { ...item, column: await temp[item.name] };
      } else {
        const suitableColumns = columns.filter(column => column.type === item.type);
        if (suitableColumns.length > 0) {
          const removeColumn = suitableColumns.shift().name;
          temp[item.name] = removeColumn;
          columns = columns.filter(column => column.name !== removeColumn);
          return { ...item, column: removeColumn };
        } else {
          temp[item.name] = generateColumn(item.type, hemera, temp);
          const column = await temp[item.name];
          return { ...item, column };
        }
      } 
    }));
    return { ...group, items: newItems };
  }));
  return { assignUserApp, temp };
}

export async function combineConfig(
  oldGroups,
  newGroups,
  columns,
  hemera,
  allGroups: any = [],
  temp = {}
) {
  const assignGroups = Promise.all(newGroups.map(async (newGroup) => {
    const oldGroup = oldGroups.filter(item => item.name === newGroup.name)[0];
    if (oldGroup) {
      if (newGroup.items) {
        const oldItems = oldGroup.items;
        const newItems = newGroup.items;
        const {
          assignGroups,
        } = await combineConfig(oldItems, newItems, columns, hemera, allGroups, temp);
        newGroup.items =  await assignGroups;
      }
      return { ...oldGroup, ...newGroup };
    } else if (!newGroups.items) {
      let column;
      let anotherItem: any[] = [];
      allGroups.forEach((item) => {
        anotherItem = item.items.filter(item => item.name === newGroup.name);
      });
      if (anotherItem[0]) {
        column = anotherItem[0].column;
      } else {
        if (!temp[newGroup.name]) {
          const suitableColumns = columns.filter(column => column.type === newGroup.type);
          if (suitableColumns[0]) {
            const removeColumn = suitableColumns.shift().name;
            temp[newGroup.name] = removeColumn;
            columns = columns.filter(column => column.name !== removeColumn);
          } else {
            temp[newGroup.name] = generateColumn(newGroup.type, hemera, temp);
          }
        }
        column = await temp[newGroup.name];
      }
      return { ...newGroup, column };
    } else {
      const {
          assignGroups,
      } = await combineConfig([], newGroup.items, columns, hemera, allGroups, temp);
      newGroup.items = await assignGroups;
      return { ...newGroup };
    }
  }));
  return { assignGroups, temp };
}
