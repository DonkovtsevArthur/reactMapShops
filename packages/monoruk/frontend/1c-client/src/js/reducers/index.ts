import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import auth, { AuthStore } from './auth';
import widgets, { WidgetsStore } from './widgets';

export interface Store {
  auth: AuthStore;
  widgets: WidgetsStore;
}

const mainReducer = combineReducers<Store>({
  auth,
  widgets,
  routing: routerReducer
});

export default mainReducer;
