import * as auth from '../constants/auth';
import { AuthActions } from '../actions/auth';

export interface AuthStore {
  orgId: string;
  token: string;
  appType: string;
}

const defaultState: AuthStore = {
  orgId: '',
  token: '',
  appType: '',
};

export default (state: AuthStore = defaultState, action: AuthActions) => {
  switch (action.type) {
  case auth.SET_USER_INFO:
    return { ...state, token: action.token, orgId: action.orgId, appType: action.appType };
  default:
    return state;
  }
};
