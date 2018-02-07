import * as Moment from 'moment';
import { WidgetConfig } from '../reducers/widgets';

const DATE_FIELD = 'dateDoc';

interface Column {
  name: string;
  alias: string;
  type: string;
  businessType: string;
  system: boolean;
  needDirectory: boolean;
  column: string;
}

interface DateLimit {
  actual: string;
  prev: string;
  all: string;
  duration: number;
}

function formatDate(period: string) {
  switch (period) {
  case '30days':
    return {
      actual: Moment().add(-30, 'days').utc().format('YYYY-MM-DD HH:mm:00'),
      prev: Moment().add(-60, 'days').utc().format('YYYY-MM-DD HH:mm:00'),
      duration: Moment.duration(30, 'days').asSeconds()
    };
  case '7days':
    return {
      actual: Moment().add(-7, 'days').utc().format('YYYY-MM-DD HH:mm:00'),
      prev: Moment().add(-14, 'days').utc().format('YYYY-MM-DD HH:mm:00'),
      duration: Moment.duration(7, 'days').asSeconds()
    };
  case 'yesterday':
    return {
      actual: Moment().add(-1, 'days').utc().format('YYYY-MM-DD 00:00:00'),
      prev: Moment().add(-2, 'days').utc().format('YYYY-MM-DD 00:00:00'),
      duration: Moment.duration(1, 'days').asSeconds()
    };
  case 'year':
    return {
      actual: Moment().add(-12, 'month').utc().format('YYYY-MM-DD HH:mm:00'),
      prev: Moment().add(-24, 'month').utc().format('YYYY-MM-DD HH:mm:00'),
      duration: Moment.duration(12, 'months').asSeconds()
    };
  case 'today':
    return {
      actual: Moment().utc().format('YYYY-MM-DD 00:00:00'),
      prev: Moment().add(-1, 'days').utc().format('YYYY-MM-DD 00:00:00'),
      duration: Moment.duration(1, 'days').asSeconds()
    };
  default:
    return {
      actual: Moment().utc().format('YYYY-MM-DD 00:00:00'),
      prev: Moment().add(-1, 'days').utc().format('YYYY-MM-DD 00:00:00'),
      duration: Moment.duration(1, 'days').asSeconds()
    };
  }
}

function getDateLimit(dateField: string, widgetConfig: WidgetConfig) {
  const downDateLimit = widgetConfig.period ?
  `${dateField} > toDateTime('${formatDate(widgetConfig.period).actual}')` :
  '';
  const upDateLimit = widgetConfig.period === 'yesterday' ?
  `AND ${dateField} < toDateTime('${Moment().utc().format('YYYY-MM-DD 00:00:00')}')` :
  '';
  return downDateLimit ? `WHERE ${downDateLimit} ${upDateLimit}` : '';
}

function getSection(widget: WidgetConfig) {
  return widget.section ? `GROUP BY ${widget.section}` : '';
}

function getSectionY(widget: WidgetConfig) {
  return widget.section ? `, ${widget.section} as y` : '';
}

function getDateLimitWithPrev(dateField: string, widgetConfig: WidgetConfig) {
  const downDateLimitActual = widgetConfig.period ?
  `${dateField} > toDateTime('${formatDate(widgetConfig.period).actual}')` :
  '';
  const upDateLimitActual = widgetConfig.period === 'yesterday' ?
  `AND ${dateField} < toDateTime('${Moment().utc().format('YYYY-MM-DD 00:00:00')}')` :
  '';
  const downDateLimitPrev = widgetConfig.period ?
  `${dateField} > toDateTime('${formatDate(widgetConfig.period).prev}')` :
  '';
  const upDateLimitPrev = widgetConfig.period ?
  `AND ${dateField} < toDateTime('${formatDate(widgetConfig.period).actual}')` :
  '';
  return {
    actual: downDateLimitActual ? `${downDateLimitActual} ${upDateLimitActual}` : '',
    prev: downDateLimitPrev ? `${downDateLimitPrev} ${upDateLimitPrev}` : '',
    all: `${downDateLimitPrev} ${upDateLimitActual}`,
    duration: formatDate(widgetConfig.period).duration
  };
}

export function getStoresQuery(widget: WidgetConfig) {
  const dateLimit = getDateLimit('dateDoc', widget);
  return `SELECT DISTINCT
            storeUuid, dictGetString('_${widget.dataSourceId}|storeUuid_', 'value', tuple(storeUuid)) as name
          FROM dataSource
          ${dateLimit}
          GROUP BY storeUuid`;
}

export function getDashboardsProceeds(widget: WidgetConfig, orgId: string) {
  const dateLimit = getDateLimitWithPrev(DATE_FIELD, widget);
  return `SELECT DISTINCT
          dictGetString('_${orgId}|copyOrgId_', 'value', tuple(orgId)) as org,
          toFloat32(floor(${widget.indexAction}If(x, ${widget.index === 'documentUuid' ? "x!=''" : 'x!=0'}), 2)) as x,
          toFloat32(floor(${widget.indexAction}If(x1, ${widget.index === 'documentUuid' ? "x1!=''" : 'x1!=0'}), 2)) as x1
          FROM (
            SELECT DISTINCT
              documentUuid,
              orgId,
              (CASE WHEN ${dateLimit.actual} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : 0} END) as x,
              (CASE WHEN ${dateLimit.prev} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : 0} END) as x1
              ${widget.section ? `, ${widget.section}` : ''}
            FROM all WHERE ${dateLimit.all}) GROUP BY orgId
  `;
}

export function getMarketsProceeds(widget: WidgetConfig) {
  const dateLimit = getDateLimitWithPrev(DATE_FIELD, widget);
  return `SELECT DISTINCT
          dictGetString('_${widget.dataSourceId}|storeUuid_', 'value', tuple(storeUuid)) as alias,
          storeUuid as uuid,
          toFloat32(floor(${widget.indexAction}If(x, ${widget.index === 'documentUuid' ? "x!=''" : 'x!=0'}), 2)) as x,
          toFloat32(floor(${widget.indexAction}If(x1, ${widget.index === 'documentUuid' ? "x1!=''" : 'x1!=0'}), 2)) as x1
          FROM (
            SELECT DISTINCT
              documentUuid,
              storeUuid,
              (CASE WHEN ${dateLimit.actual} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : 0} END) as x,
              (CASE WHEN ${dateLimit.prev} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : 0} END) as x1
              ${widget.section ? `, ${widget.section}` : ''}
            FROM dataSource WHERE ${dateLimit.all}) GROUP BY storeUuid ORDER BY x DESC
  `;
}

function getDistinctXParam(
  config: WidgetConfig,
  dataSource: string,
  orgId: string
) {
  const section = config.section;
  let columns: Column[] = [];
  for (const group of config.dataSourceConfig) {
    columns = [...columns, ...group.items];
  }
  console.log(columns);
  const column = columns.filter(item => item.name === section)[0];
  console.info('column', column);
  if (column && column.needDirectory) {
    return `dictGetString('_${dataSource ? orgId : config.dataSourceId}|${dataSource ? 'copyOrgId' : config.section}_', 'value', tuple(x)) as x`;
  }
  return 'x';
}

function getGroupParamForBar(period: string, dateLimit: DateLimit, widget: WidgetConfig) {
  switch (period) {
  case 'today':
  case 'yesterday':
    return {
      group: `(CASE WHEN ${dateLimit.all} THEN toHour(plus(${DATE_FIELD}, timeZone)) ELSE -1 END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y1`,
      result: `x, toFloat32(${widget.indexAction || 'sum'}If(y, ${widget.index === 'documentUuid' ? "y!=''" : 'y!=-1'})) as y, toFloat32(${widget.indexAction || 'sum'}If(y1, ${widget.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'})) as y1`
    };
  case '7days':
  case '30days':
    return {
      group: `(CASE WHEN ${dateLimit.actual} THEN toDate(plus(${DATE_FIELD}, timeZone)) ELSE toDate(plus(${DATE_FIELD}, plus(timeZone, ${dateLimit.duration}))) END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y1`,
      result: `x, toFloat32(${widget.indexAction || 'sum'}If(y, ${widget.index === 'documentUuid' ? "y!=''" : 'y!=-1'})) as y, toFloat32(${widget.indexAction || 'sum'}If(y1, ${widget.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'})) as y1`
    };
  case 'year':
    return {
      group: `(CASE WHEN ${dateLimit.actual} THEN arrayStringConcat([toString(toMonth(plus(${DATE_FIELD}, timeZone))), toString(toYear(plus(${DATE_FIELD}, timeZone)))], '.') ELSE arrayStringConcat([toString(toMonth(plus(${DATE_FIELD}, plus(${dateLimit.duration}, timeZone)))), toString(toYear(plus(${DATE_FIELD}, plus(${dateLimit.duration}, timeZone))))], '.') END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y1`,
      result: `x, toFloat32(${widget.indexAction || 'sum'}If(y, ${widget.index === 'documentUuid' ? "y!=''" : 'y!=-1'})) as y, toFloat32(${widget.indexAction || 'sum'}If(y1, ${widget.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'})) as y1`
    };
  default:
    return {
      group: `(CASE WHEN ${dateLimit.all} THEN toHour(plus(${DATE_FIELD}, timeZone)) ELSE -1 END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : -1} END ) as y1`,
      result: `x, toFloat32(${widget.indexAction || 'sum'}If(y, ${widget.index === 'documentUuid' ? "y!=''" : 'y!=-1'})) as y, toFloat32(${widget.indexAction || 'sum'}If(y1, ${widget.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'})) as y1`
    };
  }
}

function getPieRerquest(
  widget: WidgetConfig,
  dateLimit: DateLimit,
  section: string,
  dataSource: string,
  orgId: string
) {
  return `SELECT
            ${getDistinctXParam(widget, dataSource, orgId)}, toFloat32(${widget.indexAction}(y)) as y
            FROM (SELECT DISTINCT documentUuid,
              ${widget.section === 'storeUuid' && dataSource ? 'orgId' : widget.section} as x,
              ${widget.index} as y FROM ${dataSource ? dataSource : 'dataSource'} WHERE ${dateLimit.actual} ${section})
            GROUP BY x
            ORDER BY y DESC
            LIMIT 10
          UNION ALL
          SELECT 'Остальные' as x, toFloat32(${widget.indexAction}(y)) as y
          FROM (SELECT DISTINCT documentUuid,
            ${widget.section === 'storeUuid' && dataSource ? 'orgId' : widget.section} as x,
            ${widget.index} as y
            FROM ${dataSource ? dataSource : 'dataSource'} WHERE ${dateLimit.actual} ${section} AND ${dataSource ? 'orgId' : widget.section} NOT IN (
              SELECT x
              FROM (
                SELECT x, ${widget.indexAction}(y) as y
                FROM (
                  SELECT DISTINCT documentUuid, ${widget.section === 'storeUuid' && dataSource ? 'orgId' : widget.section} as x, ${widget.index} as y
                  FROM ${dataSource ? dataSource : 'dataSource'} WHERE ${dateLimit.actual} ${section})
                  GROUP BY x
                  ORDER BY y DESC LIMIT 10
                )
              )
            ) GROUP BY x`;
}

function getCounterRequest(widget: WidgetConfig, section: string, dateLimit: DateLimit, dataSource: string) {
  return `SELECT DISTINCT
          toFloat32(floor(${widget.indexAction}If(x, ${widget.index === 'documentUuid' ? "x!=''" : 'x!=0'}), 2)) as x,
          toFloat32(floor(${widget.indexAction}If(x1, ${widget.index === 'documentUuid' ? "x1!=''" : 'x1!=0'}), 2)) as x1
          ${getSectionY(widget)}
          FROM (
            SELECT DISTINCT
              documentUuid,
              (CASE WHEN ${dateLimit.actual} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : 0} END) as x,
              (CASE WHEN ${dateLimit.prev} THEN ${widget.index} ELSE ${widget.index === 'documentUuid' ? "''" : 0} END) as x1
              ${widget.section ? `, ${widget.section}` : ''}
            FROM ${dataSource ? dataSource : 'dataSource'} WHERE ${dateLimit.all} ${section}) ${getSection(widget)}
          `;
}

function getBarRequest(widget: WidgetConfig, section: string, dateLimit: DateLimit, dataSource: string) {
  return `SELECT
            ${getGroupParamForBar(widget.period, dateLimit, widget).result}
            FROM (SELECT
                    DISTINCT documentUuid,
                    ${getGroupParamForBar(widget.period, dateLimit, widget).group}
                    FROM ${dataSource ? dataSource : 'dataSource'} WHERE ${dateLimit.all} ${section})
            GROUP BY x`;
}

function getQueryToday(
  widget: WidgetConfig,
  dateLimit: DateLimit,
  section: string,
  dataSource: string,
  orgId: string
) {
  switch (widget.graph) {
  case 'bar':
    return getBarRequest(widget, section, dateLimit, dataSource);
  case 'count':
    return getCounterRequest(widget, section, dateLimit, dataSource);
  case 'pie':
    return getPieRerquest(widget, dateLimit, section, dataSource, orgId);
  default:
    return null;
  }
}

function getQueryYesterday(
  widget: WidgetConfig,
  dateLimit: DateLimit,
  section: string,
  dataSource: string,
  orgId: string
) {
  switch (widget.graph) {
  case 'bar':
    return getBarRequest(widget, section, dateLimit, dataSource);
  case 'count':
    return getCounterRequest(widget, section, dateLimit, dataSource);
  case 'pie':
    return getPieRerquest(widget, dateLimit, section, dataSource, orgId);
  default:
    return null;
  }
}

function getQuery7day(
  widget: WidgetConfig,
  dateLimit: DateLimit,
  section: string,
  dataSource: string,
  orgId: string
) {
  switch (widget.graph) {
  case 'bar':
    return getBarRequest(widget, section, dateLimit, dataSource);
  case 'count':
    return getCounterRequest(widget, section, dateLimit, dataSource);
  case 'pie':
    return getPieRerquest(widget, dateLimit, section, dataSource, orgId);
  default:
    return null;
  }
}

function getQuery30days(
  widget: WidgetConfig,
  dateLimit: DateLimit,
  section: string,
  dataSource: string,
  orgId: string
) {
  switch (widget.graph) {
  case 'bar':
    return getBarRequest(widget, section, dateLimit, dataSource);
  case 'count':
    return getCounterRequest(widget, section, dateLimit, dataSource);
  case 'pie':
    return getPieRerquest(widget, dateLimit, section, dataSource, orgId);
  default:
    return null;
  }
}

function getQueryYear(
  widget: WidgetConfig,
  dateLimit: DateLimit,
  section: string,
  dataSource: string,
  orgId: string
) {
  switch (widget.graph) {
  case 'bar':
    return getBarRequest(widget, section, dateLimit, dataSource);
  case 'count':
    return getCounterRequest(widget, section, dateLimit, dataSource);
  case 'pie':
    return getPieRerquest(widget, dateLimit, section, dataSource, orgId);
  default:
    return null;
  }
}

export default (
  widget: WidgetConfig,
  market: string = '',
  dataSource: string = '',
  orgId: string = ''
) => {
  const dateLimit = getDateLimitWithPrev(DATE_FIELD, widget);

  const section = market ? `AND storeUuid = '${market}'` : '';
  switch (widget.period) {
  case 'today':
    return getQueryToday(widget, dateLimit, section, dataSource, orgId);
  case 'yesterday':
    return getQueryYesterday(widget, dateLimit, section, dataSource, orgId);
  case '7days':
    return getQuery7day(widget, dateLimit, section, dataSource, orgId);
  case '30days':
    return getQuery30days(widget, dateLimit, section, dataSource, orgId);
  case 'year':
    return getQueryYear(widget, dateLimit, section, dataSource, orgId);
  default:
    return getQueryToday(widget, dateLimit, section, dataSource, orgId);
  }
};
