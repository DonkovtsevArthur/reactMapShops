import { AxiosResponse } from 'axios';
import * as Redux from 'redux';
import * as Logger from 'pino';
import widgetsActions from './widgets';
import * as integration from '../constants/integration';
import { API_PROXY_URL, GROUP } from '../constants';
import { Store } from '../reducers';
import reqData from '../helper/reqData';
import { Token } from '../reducers/integration';
import { history } from '../store';

const logger = Logger();

export interface IntegrationActions {
  type: string;
  message?: string;
  tokens: Token[];
  token?: string;
  accessToken?: string;
  alias?: string;
}

export interface IntegrationActionsCreators {
  getTokens(appId: string): void;
  share(): void;
  on(token: string): void;
  off(token: string): void;
  remove(token: string): void;
  open(): Redux.Action;
  openAccess(): Redux.Action;
  close(): Redux.Action;
  closeAccess(): Redux.Action;
  changeAccessToke(accessToken: string): Redux.Action;
  changeAlias(alias: string): Redux.Action;
  addFran(accessToken: string, alias: string): void;
}

const integrationActions: IntegrationActionsCreators = {
  getTokens(appId) {
    return async (dispatch: Redux.Dispatch<Store>, getStore: () => Store) => {
      try {
        dispatch({ type: integration.REQUEST_ACCESS_TOKENS });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        const response: AxiosResponse<Token[]> = await reqData.post(API_PROXY_URL(appType), {
          path: 'access/getShareToApp',
          method: 'POST',
          data: { orgId, appId }
        });
        const tokens = response.data;
        if (tokens.length === 0) {
          await integrationActions.share()(dispatch, getStore);
        }
        dispatch({ type: integration.SUCCESS_ACCESS_TOKENS, tokens });
      } catch (error) {
        logger.error(error);
        dispatch({ type: integration.ERROR_ACCESS_TOKENS, message: error.message });
      }
    };
  },
  share() {
    return async (dispatch: Redux.Dispatch<Store>, getStore: () => Store) => {
      try {
        dispatch({ type: integration.REQUEST_SHARE_TOKEN });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        const dashboards = getStore().widgets.source;
        const dashboardsId = Object.keys(dashboards);
        const tokens = getStore().integration.tokens;
        const myDashboard = dashboardsId.filter(id => !dashboards[id].copy)[0];
        const apps = dashboards[myDashboard].widgets.map(widget => ({
          appId: widget.i,
          appType: 'widget'
        }));
        const response: AxiosResponse<{ accessToken: string }> = await reqData.post(
          API_PROXY_URL(appType),
          {
            path: 'access/share',
            method: 'POST',
            data: { orgId, apps }
          }
        );
        const token = response.data;
        dispatch({ type: integration.SUCCESS_ACCESS_TOKENS, tokens: [...tokens, token] });
      } catch (error) {
        dispatch({ type: integration.ERROR_SHARE_TOKEN, message: error.message });
        logger.error(error);
      }
    };
  },
  on(accessToken) {
    return async (dispatch: Redux.Dispatch<Store>, getStore: () => Store) => {
      try {
        dispatch({ type: integration.REQUEST_ON_TOKEN });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        const olkdTokens = getStore().integration.tokens;
        await reqData.post(API_PROXY_URL(appType), {
          path: 'access/openShare',
          method: 'POST',
          data: { orgId, accessToken }
        });
        const newTokens = olkdTokens.map(item => {
          if (item.accessToken === accessToken) {
            return { ...item, active: true };
          }
          return item;
        });
        dispatch({ type: integration.SUCCESS_ON_TOKEN, tokens: newTokens });
      } catch (error) {
        dispatch({ type: integration.ERROR_ON_TOKEN, message: error.message });
        logger.error(error.message);
      }
    };
  },
  off(accessToken) {
    return async (dispatch: Redux.Dispatch<Store>, getStore: () => Store) => {
      try {
        dispatch({ type: integration.REQUEST_ON_TOKEN });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        const olkdTokens = getStore().integration.tokens;
        await reqData.post(API_PROXY_URL(appType), {
          path: 'access/closeShare',
          method: 'POST',
          data: { orgId, accessToken }
        });
        const newTokens = olkdTokens.map(item => {
          if (item.accessToken === accessToken) {
            return { ...item, active: false };
          }
          return item;
        });
        dispatch({ type: integration.SUCCESS_ON_TOKEN, tokens: newTokens });
      } catch (error) {
        dispatch({ type: integration.ERROR_ON_TOKEN, message: error.message });
        logger.error(error.message);
      }
    };
  },
  remove(accessToken) {
    return async (dispatch: Redux.Dispatch<Store>, getStore: () => Store) => {
      try {
        dispatch({ type: integration.REQUEST_ON_TOKEN });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        const olkdTokens = getStore().integration.tokens;
        await reqData.post(API_PROXY_URL(appType), {
          path: 'access/removeShare',
          method: 'POST',
          data: { orgId, accessToken }
        });
        const newTokens = olkdTokens.filter(
          item => (item.accessToken === accessToken ? false : true)
        );
        dispatch({ type: integration.SUCCESS_ON_TOKEN, tokens: newTokens });
      } catch (error) {
        dispatch({ type: integration.ERROR_ON_TOKEN, message: error.message });
        logger.error(error.message);
      }
    };
  },
  open() {
    return { type: integration.OPEN_ADD_FRAN_DIALOG };
  },
  close() {
    return { type: integration.CLOSE_ADD_FRAN_DIALOG };
  },
  openAccess() {
    return { type: integration.OPEN_ACCESS_DIALOG };
  },
  closeAccess() {
    return { type: integration.CLOSE_ACCESS_DIALOG };
  },
  changeAccessToke(accessToken) {
    return { type: integration.CHANGE_ACCESS_TOKEN, accessToken };
  },
  changeAlias(alias) {
    return { type: integration.CHANGE_ALIAS, alias };
  },
  addFran(accessToken, alias) {
    return async (dispatch: Redux.Dispatch<Store>, getStore: () => Store) => {
      try {
        dispatch({ type: integration.REQUEST_ADD_FRAN });
        const orgId = getStore().auth.orgId;
        const appType = getStore().auth.appType;
        await reqData.post(API_PROXY_URL(appType), {
          path: 'access/copy',
          method: 'POST',
          data: { orgId, accessToken, alias, group: GROUP }
        });
        const getData = widgetsActions.getSource();
        await getData(dispatch, getStore);
        dispatch({ type: integration.SUCCESS_ADD_FRAN });
        const source = getStore().widgets.source;
        const ids = Object.keys(source);
        const active = ids.filter(item => source[item].active)[0];
        history.push({ pathname: `/${active}` });
      } catch (error) {
        dispatch({ type: integration.ERROR_ADD_FRAN, message: error.message });
        logger.error(error.message);
      }
    };
  }
};

export default integrationActions;
