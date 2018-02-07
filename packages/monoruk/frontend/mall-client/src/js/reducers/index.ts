import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import auth, { AuthStore } from './auth';
import widgets, { WidgetsStore } from './widgets';
import markets, { MarketsStore } from './markets';
import integration, { IntegrationStore } from './integration';
import dashboards, { DashboardsStore } from './dashboards';

export interface Location {
  pathname: string;
  search: string;
}

export interface Routing {
  location: Location;
}

export interface Store {
  auth: AuthStore;
  widgets: WidgetsStore;
  integration: IntegrationStore;
  markets: MarketsStore;
  routing: Routing;
  dashboards: DashboardsStore;
}

const mainReducer = combineReducers<Store>({
  auth,
  widgets,
  integration,
  markets,
  dashboards,
  routing: routerReducer
});

export default mainReducer;
