import * as Redux from 'redux';
import * as Axios from 'axios';
import * as action from '../constants/widgets';
import marketsActions from '../actions/markets';
import { GraphData, Widget, WidgetConfig, Source, WidgetServerConfig } from '../reducers/widgets';
import { Store } from '../reducers';
import reqData from '../helper/reqData';
import queryGenerator from '../helper/queryGenerator';
import { API_PROXY_URL, API_MONITOR, GROUP } from '../constants';
import { history } from '../store';

export interface WidgetsActions {
  type: string;
  id: string;
  message?: string;
  graphData?: GraphData;
  widgets?: Widget[];
  widgetConfigs: WidgetConfig[];
  period?: string;
  markets?: number;
  market?: string;
  dashboard?: string;
  source: Source;
}

export interface Dashboard {
  active: boolean;
  alias: string;
  copy: boolean;
  group: string;
  _id: string;
}

export interface ActiveDashboards extends Dashboard {
  widgets: Widget[];
}

export interface WidgetsActionCreators {
  getData(
    id: string
  ): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => Promise<void>;
  getAllData(
    id: string
  ): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => Promise<void>;
  getSource(): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => Promise<void>;
  waitProcessStart(): Redux.Action;
  updateWidget(id: string, period: string): void;
  updateAllDataWidget(id: string, period: string): void;
  selectMarket(market: string): Redux.Action;
  removeMarket(): Redux.Action;
  subscribe(id: string): Redux.Action;
  unsubscribe(id: string): Redux.Action;
  selectDashboard(dashboardId: string): void;
  removeDashboard(dashboardId: string): void;
  updateWidgetGraph(id: string, graph: string): void;
  updateIndexDynamicWidgets(index: string, indexAction: string): void;
  updateIndexDynamicWidgetsAllData(index: string, indexAction: string): void;
}

async function getInfoAboutDashboard(
  dispatch: Redux.Dispatch<Store>,
  getStore: () => Store,
  dashboardId: string
) {
  try {
    const orgId = getStore().auth.orgId;
    const appType = getStore().auth.appType;
    const widgetsResponse: Axios.AxiosResponse<ActiveDashboards> = await reqData.post(
      API_PROXY_URL(appType),
      {
        path: 'dashboard/get',
        method: 'POST',
        data: {
          orgId,
          dashboardId
        }
      }
    );
    const widgets = widgetsResponse.data.widgets;
    dispatch({ type: action.SUCCESS_GET_WIDGETS, id: dashboardId, widgets });
    dispatch({ type: action.REQUEST_GET_WIDGET_CONFIG });
    // let token = '';
    const widgetConfigs = await Promise.all(
      widgets.map(async widget => {
        const configResponse: Axios.AxiosResponse<WidgetConfig> = await reqData.post(
          API_PROXY_URL(appType),
          {
            path: `widget/${widget.i}?token=${widget.token}`,
            method: 'GET'
          }
        );
        return configResponse.data;
      })
    );
    dispatch({ type: action.SUCCESS_GET_WIDGET_CONFIG, widgetConfigs });
    await marketsActions.getMarketsProceeds(dashboardId)(dispatch, getStore);
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({ type: action.ERROR_ACCESS, message: error.message });
      return;
    }
    dispatch({ type: action.ERROR_MARKETS, message: error.message });
  }
}
const widgetsActions: WidgetsActionCreators = {
  getSource() {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        dispatch({ type: action.REQUEST_GET_WIDGETS });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        const dashboardResponse: Axios.AxiosResponse<Dashboard[]> = await reqData.post(
          API_PROXY_URL(appType),
          {
            path: 'dashboard/getAll',
            method: 'POST',
            data: { orgId }
          }
        );
        dashboardResponse.data.forEach(dashboard => {
          if (dashboard.group === GROUP) {
            dispatch({
              type: action.SAVE_DASHBOARD,
              id: dashboard._id,
              dashboard: {
                active: dashboard.active,
                alias: dashboard.alias,
                copy: dashboard.copy
              }
            });
          }
        });
        const dashboardId = dashboardResponse.data.filter(
          dashboard => dashboard.active && dashboard.group === GROUP
        );
        if (dashboardId.length > 0) {
          if (dashboardId[0].copy) {
            const notCopyDashboard = dashboardResponse.data.filter(
              item => !item.copy && item.group === GROUP
            )[0];
            await getInfoAboutDashboard(dispatch, getStore, notCopyDashboard._id);
            await getInfoAboutDashboard(dispatch, getStore, dashboardId[0]._id);
            return;
          }
          await getInfoAboutDashboard(dispatch, getStore, dashboardId[0]._id);
          return;
        }
        const myDashboard = dashboardResponse.data.filter(
          dashboard => !dashboard.copy && dashboard.group === GROUP
        )[0]._id;
        await getInfoAboutDashboard(dispatch, getStore, myDashboard);
      } catch (error) {
        dispatch({ type: action.ERROR_GET_WIDGETS, message: error });
      }
    };
  },
  getData(id) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        console.info('Config Start');
        dispatch({ type: action.REQUEST_DATA, id });
        const dashboards = getStore().widgets.source;
        console.info('Config dashboards --->', dashboards);
        const dashboardId = Object.keys(dashboards);
        const activeDashboard = dashboardId.filter(item => dashboards[item].active)[0];
        console.info('active dashboard --->', activeDashboard);
        const widget = dashboards[activeDashboard].widgets.filter(item => item.i === id)[0];
        console.info('widget --->', widget);
        const widgetConfig = getStore().widgets.widgetConfigs.filter(item => item.appId === id)[0];
        console.info('Config --->', widgetConfig);
        const market = getStore().widgets.market;
        if (!widget || !widgetConfig) {
          throw new Error('Widget not found');
        }
        const query = queryGenerator(widgetConfig, market);
        const graphDataResponse: Axios.AxiosResponse<GraphData> = await Axios.default.post(
          `${API_MONITOR}/data/get`,
          { query },
          {
            headers: {
              Authorization: `Bearer ${widget.token}`
            }
          }
        );
        const graphData = graphDataResponse.data;
        dispatch({ type: action.SUCCESS_DATA, graphData, id });
      } catch (error) {
        dispatch({ type: action.ERROR_DATA, id, message: error.message });
      }
    };
  },
  getAllData(id) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        dispatch({ type: action.REQUEST_DATA, id });
        const dashboards = getStore().widgets.source;
        const orgId = getStore().auth.orgId;
        const dashboardId = Object.keys(dashboards);
        const activeDashboard = dashboardId.filter(item => dashboards[item].active)[0];
        const widget = dashboards[activeDashboard].widgets.filter(item => item.i === id)[0];
        const widgetConfig = getStore().widgets.widgetConfigs.filter(item => item.appId === id)[0];
        if (!widget || !widgetConfig) {
          throw new Error('Widget not found');
        }
        const query = queryGenerator(widgetConfig, '', 'all', orgId);
        const graphDataResponse: Axios.AxiosResponse<GraphData> = await Axios.default.post(
          `${API_MONITOR}/data/get`,
          { query },
          {
            headers: {
              Authorization: `Bearer ${widget.token}`
            }
          }
        );
        const graphData = graphDataResponse.data;
        dispatch({ type: action.SUCCESS_DATA, graphData, id });
      } catch (error) {
        dispatch({ type: action.ERROR_DATA, id, message: error.message });
      }
    };
  },
  updateWidget(id, period) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      const widgetConfigs = getStore().widgets.widgetConfigs;
      const dashboards = getStore().widgets.source;
      const dashboardId = Object.keys(dashboards);
      const activeDashboard = dashboardId.filter(item => dashboards[item].active)[0];
      const appType = getStore().auth.appType;
      const widgets = dashboards[activeDashboard].widgets;
      const activeWidgetConfigs = widgets.map(
        item => widgetConfigs.filter(config => config.appId === item.i)[0]
      );
      const newWidgetConfigs = activeWidgetConfigs.map(item => ({
        ...item,
        period
      }));
      dispatch({
        type: action.UPDATE_WIDGET_CONFIG,
        widgetConfigs: newWidgetConfigs
      });
      await Promise.all(
        newWidgetConfigs.map(async item => {
          const { dataSourceId, dataSourceConfig, ...data } = item;
          dispatch({
            type: action.REQUEST_UPDATE_WIDGET_PERIOD,
            id: item.appId,
            period
          });
          return reqData.post(API_PROXY_URL(appType), {
            path: 'widget/update',
            method: 'POST',
            data
          });
        })
      );
      dispatch({ type: action.SUCCESS_UPDATE_WIDGET_CONFIG, id });
      await Promise.all(
        newWidgetConfigs.map(async item => {
          return widgetsActions.getData(item.appId)(dispatch, getStore);
        })
      );
      await marketsActions.getMarketsProceeds(activeDashboard)(dispatch, getStore);
    };
  },
  updateAllDataWidget(id, period) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      const widgetConfigs = getStore().widgets.widgetConfigs;
      const dashboards = getStore().widgets.source;
      const dashboardId = Object.keys(dashboards);
      const activeDashboard = dashboardId.filter(item => dashboards[item].active)[0];
      const appType = getStore().auth.appType;
      const widgets = dashboards[activeDashboard].widgets;
      const activeWidgetConfigs = widgets.map(
        item => widgetConfigs.filter(config => config.appId === item.i)[0]
      );
      const newWidgetConfigs = activeWidgetConfigs.map(item => ({
        ...item,
        period
      }));
      dispatch({
        type: action.UPDATE_WIDGET_CONFIG,
        widgetConfigs: newWidgetConfigs
      });
      await Promise.all(
        newWidgetConfigs.map(async item => {
          const { dataSourceId, dataSourceConfig, ...data } = item;
          dispatch({
            type: action.REQUEST_UPDATE_WIDGET_PERIOD,
            id: item.appId,
            period
          });
          return reqData.post(API_PROXY_URL(appType), {
            path: 'widget/update',
            method: 'POST',
            data
          });
        })
      );
      dispatch({ type: action.SUCCESS_UPDATE_WIDGET_CONFIG, id });
      await Promise.all(
        newWidgetConfigs.map(async item => {
          return widgetsActions.getAllData(item.appId)(dispatch, getStore);
        })
      );
      await marketsActions.getMarketsProceeds(activeDashboard)(dispatch, getStore);
    };
  },
  updateWidgetGraph(id: string, graph: string) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      const widgetConfigs = getStore().widgets.widgetConfigs;
      const dashboards = getStore().widgets.source;
      const dashboardId = Object.keys(dashboards);
      const activeDashboard = dashboardId.filter(item => dashboards[item].active)[0];
      const widget = dashboards[activeDashboard].widgets.filter(item => item.i === id)[0];
      const appType = getStore().auth.appType;
      let newConfig;
      const newWidgetConfigs = widgetConfigs.map(config => {
        if (config.appId === id) {
          const { dataSourceConfig, dataSourceId, ...data } = config;
          newConfig = { ...data, graph };
          return { ...config, graph };
        }
        return config;
      });
      dispatch({
        type: action.UPDATE_WIDGET_CONFIG,
        widgetConfigs: newWidgetConfigs
      });
      dispatch({
        type: action.REQUEST_UPDATE_WIDGET_CONFIG,
        id: widget.i
      });
      await reqData.post(API_PROXY_URL(appType), {
        path: 'widget/update',
        method: 'POST',
        data: newConfig
      });
      dispatch({ type: action.SUCCESS_UPDATE_WIDGET_CONFIG, id });
    };
  },
  updateIndexDynamicWidgets(index, indexAction) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      const widgetConfigs = getStore().widgets.widgetConfigs;
      const appType = getStore().auth.appType;
      const dashboards = getStore().widgets.source;
      const dashboardId = Object.keys(dashboards);
      const activeDashboard = dashboardId.filter(item => dashboards[item].active)[0];
      const activeWidgetsId = dashboards[activeDashboard].widgets.map(widget => widget.i);
      const updateWidgets: WidgetServerConfig[] = [];
      const newWidgetConfigs = widgetConfigs.map(config => {
        const active = activeWidgetsId.some(id => id === config.appId);
        if (config.graph !== 'count' && config.section !== 'productName' && active) {
          const { dataSourceId, dataSourceConfig, ...data } = config;
          updateWidgets.push({ ...data, index, indexAction });
          return { ...config, index, indexAction };
        }
        return config;
      });
      dispatch({
        type: action.UPDATE_WIDGET_CONFIG,
        widgetConfigs: newWidgetConfigs
      });
      await Promise.all(
        updateWidgets.map(async data => {
          await reqData.post(API_PROXY_URL(appType), {
            path: 'widget/update',
            method: 'POST',
            data
          });
          dispatch({ type: action.SUCCESS_UPDATE_WIDGET_CONFIG, id: data.appId });
        })
      );
      await Promise.all(
        updateWidgets.map(async item => {
          return widgetsActions.getData(item.appId)(dispatch, getStore);
        })
      );
    };
  },
  updateIndexDynamicWidgetsAllData(index, indexAction) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      const widgetConfigs = getStore().widgets.widgetConfigs;
      const appType = getStore().auth.appType;
      const dashboards = getStore().widgets.source;
      const dashboardId = Object.keys(dashboards);
      const activeDashboard = dashboardId.filter(item => dashboards[item].active)[0];
      const activeWidgetsId = dashboards[activeDashboard].widgets.map(widget => widget.i);
      const updateWidgets: WidgetServerConfig[] = [];
      const newWidgetConfigs = widgetConfigs.map(config => {
        const active = activeWidgetsId.some(id => id === config.appId);
        if (config.graph !== 'count' && config.section !== 'productName' && active) {
          const { dataSourceId, dataSourceConfig, ...data } = config;
          updateWidgets.push({ ...data, index, indexAction });
          return { ...config, index, indexAction };
        }
        return config;
      });
      dispatch({
        type: action.UPDATE_WIDGET_CONFIG,
        widgetConfigs: newWidgetConfigs
      });
      await Promise.all(
        updateWidgets.map(async data => {
          await reqData.post(API_PROXY_URL(appType), {
            path: 'widget/update',
            method: 'POST',
            data
          });
          dispatch({ type: action.SUCCESS_UPDATE_WIDGET_CONFIG, id: data.appId });
        })
      );
      await Promise.all(
        updateWidgets.map(async item => {
          return widgetsActions.getAllData(item.appId)(dispatch, getStore);
        })
      );
    };
  },
  selectMarket(market) {
    return { type: action.SELECT_MARKET, market };
  },
  removeMarket() {
    console.log('remove');
    return { type: action.REMOVE_MARKET };
  },
  subscribe(id) {
    return { type: action.EVENT_SUBSCRIBE, id };
  },
  unsubscribe(id) {
    return { type: action.EVENT_UNSUBSCRIBE, id };
  },
  waitProcessStart() {
    return { type: action.WAIT_PROCESS };
  },
  selectDashboard(dashboardId) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        const sources = getStore().widgets.source;
        const sourceId = Object.keys(sources);
        const source = {};
        sourceId.map(id => {
          if (id === dashboardId) {
            source[id] = { ...sources[id], active: true };
            return;
          }
          source[id] = { ...sources[id], active: false };
        });
        dispatch({ type: action.REQUEST_SELECT_DASHBOARD, source });
        await getInfoAboutDashboard(dispatch, getStore, dashboardId);
        dispatch({ type: action.SUCCESS_SELECT_DASHBOARD });
      } catch (error) {
        dispatch({ type: action.ERROR_SELECT_DASHBOARD, message: error.message });
      }
    };
  },
  removeDashboard(dashboardId) {
    return async (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => {
      try {
        const source = getStore().widgets.source;
        const ids = Object.keys(source);
        const newIds = ids.filter(item => item !== dashboardId);
        const newSource = {};
        for (const key of newIds) {
          newSource[key] = source[key];
        }
        dispatch({ type: action.REQUEST_REMOVE_DASHBOARD, source: newSource });
        const appType = getStore().auth.appType;
        await reqData.post(API_PROXY_URL(appType), {
          path: 'dashboard/remove',
          method: 'POST',
          data: { dashboardId }
        });
        dispatch({ type: action.SUCCESS_REMOVE_DASHBOARD });
        const newDashbordIds = Object.keys(newSource);
        if (newDashbordIds.length === 1) {
          history.push({ pathname: `/${newDashbordIds[0]}` });
        }
      } catch (error) {
        dispatch({ type: action.ERROR_REMOVE_DASHBOARD });
      }
    };
  }
};

export default widgetsActions;
