import * as Redux from 'redux';
import * as Axios from 'axios';
import * as action from '../constants/dashboards';
import * as Hash from 'object-hash';
import { Store } from '../reducers';
import { getDashboardsProceeds } from '../helper/queryGenerator';
import { API_MONITOR } from '../constants';
import { WidgetConfig } from '../reducers/widgets';

export interface Data {
  x: string;
  x1: string;
}

export interface DashboardsActions {
  type: string;
  hash: string;
  data: Data;
  status: string;
  message: string;
}

export interface DashboardsActionCreators {
  getProceeds():
    (dispatch: Redux.Dispatch<DashboardsActions>, getStore: () => Store) => void;
}

const marketsActions: DashboardsActionCreators = {
  getProceeds() {
    return async (dispatch: Redux.Dispatch<DashboardsActions>, getStore: () => Store) => {
      try {
        const orgId = getStore().auth.orgId;
        const source = getStore().widgets.source;
        const dashboardsIds = Object.keys(source);
        const dashboardId = dashboardsIds.filter(item => source[item].active)[0];
        const dashboard = source[dashboardId];
        const widgetConfigs = getStore().widgets.widgetConfigs;
        const widgetsId = dashboard.widgets.map(item => item.i);
        const period = widgetConfigs.filter(item => item.appId === widgetsId[0])[0].period;
        const hash = Hash.sha1({ period });
        dispatch({ type: action.REQUEST_DASHBOARDS_PROCEEDS });
        let config: WidgetConfig;
        widgetsId.some((widgetId) => {
          return widgetConfigs.some((item) => {
            const sameId = item.appId === widgetId;
            const requiredIndex = item.index === 'closeResultSum';
            const requiredIndexAction = item.indexAction === 'sum';
            const requiredGraphType = item.graph === 'count';
            const requiredNullSection = !item.section;
            if (sameId && requiredIndex && requiredIndexAction && requiredGraphType && requiredNullSection) {
              config = item;
              return true;
            }
            return false;
          });
        });
        if (config) {
          const token = dashboard.widgets.filter(item => item.i === config.appId)[0].token;
          const query = getDashboardsProceeds(config, orgId);
          const graphDataResponse: Axios.AxiosResponse<Data[]> =
            await Axios.default.post(`${API_MONITOR}/data/get`, { query }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          const data = graphDataResponse.data;
          dispatch({ type: action.SUCCESS_DASHBOARDS_PROCEEDS, hash, data });
        }
      } catch (error) {
        const widgetConfigs = getStore().widgets.widgetConfigs;
        const period = widgetConfigs[0].period;
        const hash = Hash.sha1({ period });
        dispatch({ type: action.ERROR_DASHBOARDS_PROCEEDS, hash, message: error.message });
      }
    };
  }
};

export default marketsActions;
