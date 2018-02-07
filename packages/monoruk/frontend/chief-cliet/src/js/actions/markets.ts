import * as Redux from 'redux';
import * as Axios from 'axios';
import * as action from '../constants/markets';
import * as Hash from 'object-hash';
import { Store } from '../reducers';
import { getMarketsProceeds } from '../helper/queryGenerator';
import { API_MONITOR } from '../constants';
import { WidgetConfig } from '../reducers/widgets';

export interface Data {
  x: string;
  x1: string;
}

export interface MarketsActions {
  type: string;
  hash: string;
  data: Data;
  status: string;
  message: string;
}

export interface MarketsActionCreators {
  getMarketsProceeds(
    dashboardId: string
  ): (dispatch: Redux.Dispatch<MarketsActions>, getStore: () => Store) => void;
}

const marketsActions: MarketsActionCreators = {
  getMarketsProceeds(dashboardId) {
    return async (dispatch: Redux.Dispatch<MarketsActions>, getStore: () => Store) => {
      try {
        const dashboard = getStore().widgets.source[dashboardId];
        const widgetConfigs = getStore().widgets.widgetConfigs;
        const widgetsId = dashboard.widgets.map(item => item.i);
        const period = widgetConfigs[0].period;
        const hash = Hash.sha1({ dashboardId, period });
        dispatch({ type: action.REQUEST_MARKET_PROCEEDS });
        let config: WidgetConfig | undefined;
        widgetsId.some(widgetId => {
          return widgetConfigs.some(item => {
            const sameId = item.appId === widgetId;
            const requiredIndex = item.index === 'closeResultSum';
            const requiredIndexAction = item.indexAction === 'sum';
            const requiredGraphType = item.graph === 'count';
            const requiredNullSection = !item.section;
            if (
              sameId &&
              requiredIndex &&
              requiredIndexAction &&
              requiredGraphType &&
              requiredNullSection
            ) {
              config = item;
              return true;
            }
            return false;
          });
        });
        if (config) {
          const token = dashboard.widgets.filter(item => config && item.i === config.appId)[0]
            .token;
          const query = getMarketsProceeds(config);
          const graphDataResponse: Axios.AxiosResponse<Data[]> = await Axios.default.post(
            `${API_MONITOR}/data/get`,
            { query },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const data = graphDataResponse.data;
          const markets = data.length;
          dispatch({ type: action.SUCCESS_MARKET_PROCEEDS, hash, data, markets });
        }
      } catch (error) {
        dispatch({ type: action.ERROR_MARKET_PROCEEDS, message: error.message });
      }
    };
  }
};

export default marketsActions;
