import * as Redux from 'redux';
import * as History from 'history';
import * as ReduxThunk from 'redux-thunk';
import reducers, { Store } from './reducers';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

export const history = History.createBrowserHistory();
const middleware = Redux.applyMiddleware(ReduxThunk.default);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = Redux.createStore<Store>(reducers, middleware);

export default store;
