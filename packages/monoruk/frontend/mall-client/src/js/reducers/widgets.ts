import * as widgets from '../constants/widgets';
import * as markets from '../constants/markets';
import * as integration from '../constants/integration';
import { WidgetsActions } from '../actions/widgets';

export interface GraphData {
  x: number | string;
  x1: number;
  y: number | string;
  y1: number;
}

export interface Widget {
  y: number;
  x: number;
  token: string;
  url: string;
  h: number;
  w: number;
  _id: string;
  minH: number;
  minW: number;
  local: boolean;
  i: string;
}

export interface WidgetData {
  status: string;
  message: string;
  period: string;
  graphData: GraphData[];
}

export interface Item {
  name: string;
  alias: string;
  type: string;
  businessType: string;
  system: boolean;
  needDirectory: boolean;
  column: string;
}

export interface DataSourceConfig {
  name: string;
  period: string;
  alias: string;
  items: Item[];
}

export interface WidgetConfig {
  appId: string;
  dataSourceId: string;
  dateEnd: string;
  dateStart: string;
  graph: string;
  group: string;
  index: string;
  indexAction: string;
  dataSourceConfig: DataSourceConfig[];
  period: string;
  section: string;
}

export interface WidgetServerConfig {
  appId: string;
  dateEnd: string;
  dateStart: string;
  graph: string;
  group: string;
  index: string;
  indexAction: string;
  period: string;
  section: string;
}

export interface Dashboard {
  active: boolean;
  alias: string;
  copy: boolean;
  widgets: Widget[];
}

export interface Source {
  [key: string]: Dashboard;
}

export interface WidgetsStore {
  widgets: { [key: string]: WidgetData };
  source: Source;
  widgetConfigs: WidgetConfig[];
  markets: number;
  status: string;
  message: string;
  market: string;
  subscriptions: { [key: string]: boolean };
}

const defaultStore = {
  widgets: {},
  source: {},
  widgetConfigs: [],
  markets: 0,
  status: '',
  message: '',
  market: '',
  subscriptions: {}
};

export default (state: WidgetsStore = defaultStore, action: WidgetsActions) => {
  switch (action.type) {
  case widgets.REQUEST_GET_WIDGETS:
    return { ...state, status: 'request' };
  case widgets.ERROR_GET_WIDGETS:
    return { status: 'error', message: action.message };
  case widgets.SUCCESS_GET_WIDGETS:
    return {
      ...state,
      message: '',
      source: {
        ...state.source,
        [action.id]: {
          ...state.source[action.id],
          widgets: action.widgets
        }
      }
    };
  case widgets.REQUEST_GET_WIDGET_CONFIG:
    return { ...state };
  case widgets.ERROR_GET_WIDGET_CONFIG:
    return { status: 'error', message: action.message };
  case widgets.SUCCESS_GET_WIDGET_CONFIG:
    return { ...state, message: '', status: 'success', widgetConfigs: action.widgetConfigs };
  case widgets.REQUEST_MARKETS:
    return { ...state };
  case widgets.ERROR_MARKETS:
    return { status: 'error', message: action.message };
  case widgets.SUCCESS_MARKETS:
    return { ...state, status: 'success', message: '', markets: action.markets };
  case widgets.SELECT_MARKET:
    return { ...state, market: action.market };
  case widgets.REMOVE_MARKET:
    return { ...state, market: '' };
  case widgets.EVENT_SUBSCRIBE:
    return { ...state, subscriptions: { ...state.subscriptions, [action.id]: true } };
  case widgets.EVENT_UNSUBSCRIBE:
    return { ...state, subscriptions: { ...state.subscriptions, [action.id]: true } };
  case widgets.SAVE_DASHBOARD:
    return { ...state, source: { ...state.source, [action.id]: action.dashboard } };
  case widgets.REQUEST_SELECT_DASHBOARD:
    return { ...state, source: action.source, status: 'request' };
  case widgets.REQUEST_DATA:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'request',
          message: ''
        }
      }
    };
  case widgets.ERROR_DATA:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'error',
          message: action.message
        }
      }
    };
  case widgets.SUCCESS_DATA:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'success',
          message: '',
          graphData: action.graphData
        }
      }
    };
  case widgets.UPDATE_WIDGET_CONFIG:
    return {
      ...state,
      widgetConfigs: action.widgetConfigs
    };
  case widgets.REQUEST_UPDATE_WIDGET_PERIOD:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'request',
          message: '',
          period: action.period
        }
      }
    };
  case widgets.REQUEST_UPDATE_WIDGET_CONFIG:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'request',
          message: ''
        }
      }
    };
  case widgets.ERROR_UPDATE_WIDGET_CONFIG:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'error',
          message: action.message
        }
      }
    };
  case widgets.SUCCESS_UPDATE_WIDGET_CONFIG:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'success',
          message: ''
        }
      }
    };
  case markets.SUCCESS_MARKET_PROCEEDS:
    return { ...state, markets: action.markets };
  case widgets.ERROR_ACCESS:
    return { ...state, status: 'errorAccess' };
  case widgets.WAIT_PROCESS:
    return { ...state, status: 'request' };
  case widgets.REQUEST_REMOVE_DASHBOARD:
    return { ...state, source: action.source };
  case integration.REQUEST_ADD_FRAN:
    return { ...state, status: 'request' };
  default:
    return state;
  }
};
