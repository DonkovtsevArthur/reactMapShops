import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import mainReducer from './reducers/mainReducer'

export const history = createHistory()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, routeMiddleware]

if (process.env.NODE_ENV === `development`) {
	// middlewares.push();
}
// const composeEnhancers = global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
	mainReducer,
	// process.env.NODE_ENV === `development` ?
	// composeEnhancers(applyMiddleware(...middlewares))
	// :
	applyMiddleware(...middlewares)
)

export default store
