import * as dashboards from '../constants/dashboards';
import { DashboardsActions } from '../actions/dashboards';

export interface DashboardsData {
  x: number;
  x1: number;
  org: string;
}

export interface DashboardsStore {
  data: { [key: string]: DashboardsData[] };
  aliases: { [key: string]: string };
  status: string;
  message: string;
}

const defaultStore = {
  data: {},
  aliases: {},
  status: '',
  message: ''
};

export default (state: DashboardsStore = defaultStore, action: DashboardsActions) => {
  switch (action.type) {
  case dashboards.REQUEST_DASHBOARDS_PROCEEDS:
    return {
      ...state,
      status: 'request'
    };
  case dashboards.ERROR_DASHBOARDS_PROCEEDS:
    return {
      ...state,
      status: 'error',
      message: action.message
    };
  case dashboards.SUCCESS_DASHBOARDS_PROCEEDS:
    return {
      ...state,
      status: '',
      data: {
        [action.hash]: action.data
      }
    };
  default:
    return state;
  }
};
