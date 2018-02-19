import * as Moment from 'moment';
import { WidgetConfig } from '../reducers/widgets';

function formatDate(period: string) {
  switch (period) {
    case 'month':
      return Moment()
        .add(-1, 'month')
        .utc()
        .format('YYYY-MM-DD HH:mm:00');
    case 'quarter':
      return Moment()
        .add(-4, 'month')
        .utc()
        .format('YYYY-MM-DD HH:mm:00');
    case 'half-year':
      return Moment()
        .add(-6, 'month')
        .utc()
        .format('YYYY-MM-DD HH:mm:00');
    case 'year':
      return Moment()
        .add(-12, 'month')
        .utc()
        .format('YYYY-MM-DD HH:mm:00');
    default:
      return Moment()
        .add(-1, 'month')
        .utc()
        .format('YYYY-MM-DD HH:mm:00');
  }
}

function getDateLimit(dateField: string, widgetConfig: WidgetConfig) {
  const downDateLimit = widgetConfig.period
    ? `${dateField} > toDateTime('${formatDate(widgetConfig.period)}')`
    : '';
  return downDateLimit ? `WHERE ${downDateLimit}` : '';
}

export function queryGeneratorDebtors5() {
  return `SELECT
            anyLast(debtors5) as x
          FROM ( SELECT * FROM dataSource ORDER BY timestamp, dateDoc)`;
}

export default (widget: WidgetConfig) => {
  const dateLimit = getDateLimit('dateDoc', widget);
  return `SELECT
            anyLast(y) as y,
            toDate(x) as x
          FROM (
            SELECT dateDoc AS x, ${
              widget.index
            } AS y, timestamp FROM dataSource ${dateLimit} ORDER BY timestamp
          )
          GROUP BY x`;
};
