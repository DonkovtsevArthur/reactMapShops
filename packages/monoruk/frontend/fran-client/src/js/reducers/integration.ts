import * as integration from '../constants/integration';
import { IntegrationActions } from '../actions/integration';

export interface App {
  appType: string;
  appId: string;
}

export interface Token {
  accessToken: string;
  active: boolean;
  parent: string;
  apps: App[];
}

export interface Dialog {
  accessToken: string;
  alias: string;
  visible: boolean;
}

export interface AccessDialog {
  visible: boolean;
}

export interface IntegrationStore {
  tokens: Token[];
  status: string;
  message: string;
  dialog: Dialog;
  accessDialog: AccessDialog;
}

const defaultState: IntegrationStore = {
  tokens: [],
  dialog: {
    accessToken: '',
    alias: '',
    visible: false
  },
  accessDialog: {
    visible: false
  },
  status: '',
  message: ''
};

export default (state: IntegrationStore = defaultState, action: IntegrationActions) => {
  switch (action.type) {
  case integration.REQUEST_ACCESS_TOKENS:
    return { ...state, status: 'request' };
  case integration.SUCCESS_ACCESS_TOKENS:
    return { ...state, status: '', message: '', tokens: action.tokens };
  case integration.ERROR_ACCESS_TOKENS:
    return { ...state, status: 'error', message: action.message };
  case integration.SUCCESS_SHARE_TOKEN:
    return { ...state, status: '', message: '', tokens: [ ...state.tokens, action.token ] };
  case integration.SUCCESS_ON_TOKEN:
    return { ...state, status: '', message: '', tokens: action.tokens };
  case integration.ERROR_ON_TOKEN:
    return { ...state, status: 'error', message: action.message };
  case integration.SUCCESS_OFF_TOKEN:
    return { ...state, status: '', message: '', tokens: action.tokens };
  case integration.ERROR_OFF_TOKEN:
    return { ...state, status: 'error', message: action.message };
  case integration.SUCCESS_REMOVE_TOKEN:
    return { ...state, status: '', message: '', tokens: action.tokens };
  case integration.ERROR_REMOVE_TOKEN:
    return { ...state, status: 'error', message: action.message };
  case integration.OPEN_ADD_FRAN_DIALOG:
    return { ...state, dialog: { ...state.dialog, visible: true } };
  case integration.CLOSE_ADD_FRAN_DIALOG:
    return { ...state, dialog: { ...state.dialog, visible: false, alias: '', accessToken: '' } };
  case integration.OPEN_ACCESS_DIALOG:
    return { ...state, accessDialog: { ...state.accessDialog, visible: true } };
  case integration.CLOSE_ACCESS_DIALOG:
    return { ...state, accessDialog: { ...state.accessDialog, visible: false } };
  case integration.CHANGE_ACCESS_TOKEN:
    return { ...state, dialog: { ...state.dialog, accessToken: action.accessToken } };
  case integration.CHANGE_ALIAS:
    return { ...state, dialog: { ...state.dialog, alias: action.alias } };
  case integration.REQUEST_ADD_FRAN:
    return { ...state, status: 'request', dialog: { ...state.dialog, visible: false } };
  case integration.SUCCESS_ADD_FRAN:
    return { ...state, status: '', message: '' };
  case integration.ERROR_ADD_FRAN:
    return { ...state, status: 'error', message: action.message };
  default:
    return state;
  }
};
