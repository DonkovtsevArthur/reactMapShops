import axios, { AxiosResponse } from 'axios';
import * as Redux from 'redux';
import * as Logger from 'pino';
import * as auth from '../constants/auth';
import { API_URL } from '../constants';
import { Store } from '../reducers';
import reqData from '../helper/reqData';

const logger = Logger();

export interface AuthActions {
  type: string;
  token: string;
  orgId: string;
  appType: string;
}

export interface AuthActionCreators {
  setUserInfo(token: string): void;
}

export interface User {
  org: string;
}

export interface Auth {
  token: string;
  user: User;
  appType: string;
}

const authActions: AuthActionCreators = {
  setUserInfo(token) {
    return async (dispatch: Redux.Dispatch<Store>) => {
      try {
        console.info('Запрос на авторизацию');
        dispatch({ type: auth.REQUEST_LK_TOKEN });
        const response: AxiosResponse<Auth> = await axios.post(`${API_URL}/authByEvotorToken`, {
          token
        });
        const jwtToken = response.data.token;
        const orgId = response.data.user.org;
        const appType = response.data.appType;
        reqData.interceptors.request.use((config: any) => {
          config.headers = {
            Authorization: `Bearer ${jwtToken}`
          };
          return config;
        });
        dispatch({ type: auth.SET_USER_INFO, orgId, appType, token: jwtToken });
      } catch (error) {
        logger.error(error);
        dispatch({ type: auth.ERROR_LK_TOKEN });
      }
    };
  }
};

export default authActions;
