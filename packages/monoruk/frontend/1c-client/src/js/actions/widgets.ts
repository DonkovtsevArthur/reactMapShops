import * as Redux from 'redux';
import * as Axios from 'axios';
import * as action from '../constants/widgets';
import { GraphData, Widget, WidgetConfig } from '../reducers/widgets';
import { Store } from '../reducers';
import reqData from '../helper/reqData';
import queryGenerator, { queryGeneratorDebtors5 } from '../helper/queryGenerator';
import { API_PROXY_URL, API_MONITOR } from '../constants';

export interface Debtors5 {
  x: string;
  y: number;
}

export interface WidgetsActions {
  type: string;
  id: string;
  message?: string;
  graphData?: GraphData;
  source?: Widget[];
  widgetConfigs: WidgetConfig[];
  period?: string;
  debtors5?: Debtors5[];
}

export interface Dashboard {
  active: boolean;
  alias: string;
  _id: string;
  group: string;
}

export interface ActiveDashboards extends Dashboard {
  widgets: Widget[];
}

export interface WidgetsActionCreators {
  getData(id: string): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => void;
  getDebtors5(id: string): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => void;
  getSource(): void;
  updateWidget(id: string, config: WidgetConfig): void;
}

const widgetsActions: WidgetsActionCreators = {
  getSource() {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        dispatch({ type: action.REQUEST_GET_WIDGETS });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        const dashboardResponse: Axios.AxiosResponse<Dashboard[]> =
          await reqData.post(API_PROXY_URL(appType), {
            path: 'dashboard/getAll',
            method: 'POST',
            data: { orgId }
          });
        const filterDashboard = dashboardResponse.data.filter(dashboard => dashboard.group === '1c');
        if (filterDashboard.length === 0) {
          throw new Error('Нет дашбордов!');
        }
        const dashboardId = filterDashboard[0]._id;
        const widgetsResponse: Axios.AxiosResponse<ActiveDashboards> =
          await reqData.post(API_PROXY_URL(appType), {
            path: 'dashboard/get',
            method: 'POST',
            data: {
              orgId,
              dashboardId
            }
          });
        const source = widgetsResponse.data.widgets;
        dispatch({ type: action.SUCCESS_GET_WIDGETS, source });
        dispatch({ type: action.REQUEST_GET_WIDGET_CONFIG });
        const widgetConfigs = await Promise.all(source.map(async (widget) => {
          const configResponse: Axios.AxiosResponse<WidgetConfig> =
            await reqData.post(API_PROXY_URL(appType), {
              path: `widget/${widget.i}?token=${widget.token}`,
              method: 'GET'
            });
          return configResponse.data;
        }));
        dispatch({ type: action.SUCCESS_GET_WIDGET_CONFIG, widgetConfigs });
      } catch (error) {
        dispatch({ type: action.ERROR_GET_WIDGETS, message: error });
      }
    };
  },
  getDebtors5(id) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        dispatch({ type: action.REQUEST_DEBTORS5, id });
        const widget = getStore().widgets.source.filter(item => item.i === id)[0];
        const widgetConfig = getStore().widgets.widgetConfigs.filter(item => item.appId === id)[0];
        if (!widget || !widgetConfig) {
          throw new Error('Widget not found');
        }
        const query = queryGeneratorDebtors5();
        const graphDataResponse: Axios.AxiosResponse<[{ x: string }]> =
          await Axios.default.post(`${API_MONITOR}/data/get`, { query }, {
            headers: {
              Authorization: `Bearer ${widget.token}`
            }
          });
        const debtors5String = graphDataResponse.data[0].x;
        if (debtors5String) {
          const debtors5Arr = debtors5String.split(';');
          if (debtors5Arr.length > 0) {
            const debtors5 = debtors5Arr.map((item) => {
              const x = item.slice(item.indexOf('[') + 1, item.indexOf(']:'));
              const y = parseFloat(item.slice(item.indexOf(']:') + 2));
              return { x, y };
            });
            dispatch({ type: action.SUCCESS_DEBTORS5, debtors5, id });
          }
        }
      } catch (error) {
        dispatch({ type: action.ERROR_DEBTORS5, id, message: error.message });
      }
    };
  },
  getData(id) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        dispatch({ type: action.REQUEST_DATA, id });
        const widget = getStore().widgets.source.filter(item => item.i === id)[0];
        const widgetConfig = getStore().widgets.widgetConfigs.filter(item => item.appId === id)[0];
        if (!widget || !widgetConfig) {
          throw new Error('Widget not found');
        }
        const query = queryGenerator(widgetConfig);
        const graphDataResponse: Axios.AxiosResponse<GraphData> =
          await Axios.default.post(`${API_MONITOR}/data/get`, { query }, {
            headers: {
              Authorization: `Bearer ${widget.token}`
            }
          });
        const graphData = graphDataResponse.data;
        dispatch({ type: action.SUCCESS_DATA, graphData, id });
      } catch (error) {
        dispatch({ type: action.ERROR_DATA, id, message: error.message });
      }
    };
  },
  updateWidget(id, config) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      const widgetConfigs = getStore().widgets.widgetConfigs;
      const appType = getStore().auth.appType;
      const widgetConfig = widgetConfigs.filter(item => item.appId === id)[0];
      const { dataSourceConfig, dataSourceId, ...newConfig } = widgetConfig;
      const newWidgetConfigs = widgetConfigs.map((item) => {
        if (item.appId === id) {
          return { ...item, ...config };
        }
        return item;
      });
      dispatch({
        type: action.REQUEST_UPDATE_WIDGET_CONFIG,
        id: widgetConfig.appId,
        widgetConfigs: newWidgetConfigs,
        period: config.period
      });
      await reqData.post(API_PROXY_URL(appType), {
        path: 'widget/update',
        method: 'POST',
        data: {
          ...newConfig,
          ...config
        }
      });
      dispatch({ type: action.SUCCESS_UPDATE_WIDGET_CONFIG, id });
      widgetsActions.getData(id)(dispatch, getStore);
    };
  }
};

export default widgetsActions;
