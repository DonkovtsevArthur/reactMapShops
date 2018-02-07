import * as markets from '../constants/markets';
import { MarketsActions } from '../actions/markets';

export interface MarketData {
  alias: string;
  uuid: string;
  x: number;
  x1: number;
}

export interface MarketsStore {
  data: {
    [key: string]: MarketData[];
  };
  status: string;
  message: string;
}

const defaultStore = {
  data: {},
  status: '',
  message: ''
};

export default (state: MarketsStore = defaultStore, action: MarketsActions) => {
  switch (action.type) {
  case markets.REQUEST_MARKET_PROCEEDS:
    return { ...state, status: 'request' };
  case markets.ERROR_MARKET_PROCEEDS:
    return {
      ...state,
      status: 'error',
      message: action.message
    };
  case markets.SUCCESS_MARKET_PROCEEDS:
    return {
      ...state,
      data: {
        ...state.data,
        [action.hash]: action.data
      },
      status: '',
      message: ''
    };
  default:
    return state;
  }
};
