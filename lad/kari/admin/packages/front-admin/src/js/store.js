import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducer from '~store/index'
import thunk from 'redux-thunk'

// import createSagaMiddleware from 'redux-saga'
// import { createLogger } from 'redux-logger'
// import perfomanceTools from 'react-perf-devtool'

export const history = createHistory()
// export const sagaMiddleware = createSagaMiddleware()
const middlewares = [/*sagaMiddleware,*/ thunk, routerMiddleware(history)]
const isDev = process.env.NODE_ENV === `development`

if (isDev) {
	// perfomanceTools()
	// middlewares.push(
	// 	createLogger({ collapsed: (getState, action, logEntry) => !logEntry.error, diff: true })
	// )
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = isDev
	? composeEnhancers(applyMiddleware(...middlewares))
	: applyMiddleware(...middlewares)

export const store = createStore(reducer, enhancer)
