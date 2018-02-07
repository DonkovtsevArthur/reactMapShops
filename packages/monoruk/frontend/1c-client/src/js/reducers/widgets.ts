import * as widgets from '../constants/widgets';
import { WidgetsActions, Debtors5 } from '../actions/widgets';

export interface GraphData {
  x: string;
  y: number;
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
  debtors5?: Debtors5[];
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
}

export interface WidgetsStore {
  widgets: { [key: string]: WidgetData };
  source: Widget[];
  widgetConfigs: WidgetConfig[];
  status: string;
  message: string;
}

const defaultStore = {
  widgets: {},
  source: [],
  widgetConfigs: [],
  status: '',
  message: ''
};

export default (state: WidgetsStore = defaultStore, action: WidgetsActions) => {
  switch (action.type) {
  case widgets.REQUEST_GET_WIDGETS:
    return { ...state, status: 'request' };
  case widgets.ERROR_GET_WIDGETS:
    return { status: 'error', message: action.message };
  case widgets.SUCCESS_GET_WIDGETS:
    return { ...state, status: '', message: '', source: action.source };
  case widgets.REQUEST_GET_WIDGET_CONFIG:
    return { ...state, status: 'request' };
  case widgets.ERROR_GET_WIDGET_CONFIG:
    return { status: 'error', message: action.message };
  case widgets.SUCCESS_GET_WIDGET_CONFIG:
    return { ...state, status: '', message: '', widgetConfigs: action.widgetConfigs };
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
  case widgets.REQUEST_DEBTORS5:
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
  case widgets.ERROR_DEBTORS5:
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
  case widgets.SUCCESS_DEBTORS5:
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [action.id]: {
          ...state.widgets[action.id],
          status: 'success',
          message: '',
          debtors5: action.debtors5
        }
      }
    };
  case widgets.REQUEST_UPDATE_WIDGET_CONFIG:
    return {
      ...state,
      widgetConfigs: action.widgetConfigs,
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
  default:
    return state;
  }
};
