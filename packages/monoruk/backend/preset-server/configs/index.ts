export interface Widget {
  graph: string;
  index?: string;
  period: string;
  indexAction?: string;
}

export interface Place {
  x: number;
  y: number;
}

export interface WidgetConfig {
  place: Place;
}

export interface Dashboard {
  group: string;
  alias: string;
  widgets: Widget[];
  widgetConfigs: WidgetConfig[];
}

export interface Config {
  dashboards: Dashboard[];
}

export default {
  user1cFromEvotor: {
    dashboards: [
      {
        group: '1c',
        alias: '1C',
        widgets: [{
          graph: 'line',
          index: 'payables',
          period: 'month',
        }, {
          graph: 'line',
          index: 'receivables',
          period: 'month',
        }],
        widgetConfigs: [{
          place: { x: 0, y: 0 },
        },
        {
          place: { x: 0, y: 5 },
        }],
      },
    ],
  },
  evotorMonitorClient: {
    dashboards: [
      {
        group: 'evotor-monitor-fran',
        alias: 'Мои магазины',
        widgets: [{
          graph: 'bar',
          index: 'closeResultSum',
          period: 'today',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'avg',
        }, {
          graph: 'count',
          section: 'paymentType',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          period: 'today',
          index: 'documentUuid',
          indexAction: 'count',
        }, {
          graph: 'count',
          period: 'today',
          index: 'totalQuantity',
          indexAction: 'sum',
        }, {
          graph: 'count',
          period: 'today',
          index: 'totalQuantity',
          indexAction: 'avg',
        }, {
          graph: 'pie',
          period: 'today',
          index: 'closeResultSum',
          indexAction: 'sum',
          section: 'storeUuid',
        }, {
          graph: 'pie',
          period: 'today',
          index: 'taxResultSum',
          indexAction: 'sum',
          section: 'productName',
        }],
        widgetConfigs: [{
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }],
      },
    ],
  },
  chiefClient: {
    dashboards: [
      {
        group: 'chief-client',
        alias: 'Мои магазины',
        widgets: [{
          graph: 'bar',
          index: 'closeResultSum',
          period: 'today',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'avg',
        }, {
          graph: 'count',
          section: 'paymentType',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          period: 'today',
          index: 'documentUuid',
          indexAction: 'count',
        }, {
          graph: 'count',
          period: 'today',
          index: 'totalQuantity',
          indexAction: 'sum',
        }, {
          graph: 'count',
          period: 'today',
          index: 'totalQuantity',
          indexAction: 'avg',
        }, {
          graph: 'pie',
          period: 'today',
          index: 'closeResultSum',
          indexAction: 'sum',
          section: 'storeUuid',
        }, {
          graph: 'pie',
          period: 'today',
          index: 'taxResultSum',
          indexAction: 'sum',
          section: 'productName',
        }],
        widgetConfigs: [{
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }],
      },
    ],
  },
  mallClient: {
    dashboards: [
      {
        group: 'mall-client',
        alias: 'Мои магазины',
        widgets: [{
          graph: 'bar',
          index: 'closeResultSum',
          period: 'today',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'avg',
        }, {
          graph: 'count',
          period: 'today',
          index: 'documentUuid',
          indexAction: 'count',
        }, {
          graph: 'count',
          period: 'today',
          indexAction: 'sum',
          index: 'profit',
        }],
        widgetConfigs: [{
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }],
      },
    ],
  },
  marketClient: {
    dashboards: [
      {
        group: 'market-client',
        alias: 'Мои магазины',
        widgets: [{
          graph: 'bar',
          index: 'closeResultSum',
          period: 'today',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'avg',
        }, {
          graph: 'count',
          period: 'today',
          index: 'documentUuid',
          indexAction: 'count',
        }, {
          graph: 'count',
          period: 'today',
          indexAction: 'sum',
          index: 'profit',
        }],
        widgetConfigs: [{
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }],
      },
    ],
  },
  editor: {
    dashboards: [
      {
        group: 'editor',
        alias: 'Редактор товаров. Товар',
        widgets: [{
          graph: 'line',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'line',
          index: 'documentUuid',
          period: 'today',
          indexAction: 'count',
        }, {
          graph: 'line',
          period: 'today',
          index: 'profit',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'documentUuid',
          period: 'today',
          indexAction: 'count',
        }, {
          graph: 'count',
          period: 'today',
          indexAction: 'sum',
          index: 'profit',
        }],
        widgetConfigs: [{
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }],
      },
      {
        group: 'editor',
        alias: 'Редактор товаров. Группа',
        widgets: [{
          graph: 'line',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'line',
          index: 'documentUuid',
          period: 'today',
          indexAction: 'count',
        }, {
          graph: 'line',
          index: 'profit',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'count',
          index: 'documentUuid',
          period: 'today',
          indexAction: 'count',
        }, {
          graph: 'count',
          index: 'profit',
          period: 'today',
          indexAction: 'sum',
        }, {
          graph: 'table',
          index: 'closeResultSum',
          period: 'today',
          indexAction: 'sum',
          section: 'productUuid',
        }, {
          graph: 'table',
          index: 'documentUuid',
          period: 'today',
          indexAction: 'count',
          section: 'productUuid',
        }, {
          graph: 'table',
          period: 'today',
          indexAction: 'sum',
          section: 'productUuid',
          index: 'profit',
        }],
        widgetConfigs: [{
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }, {
          place: { x: 0, y: 0 },
        }],
      },
    ],
  },
};
