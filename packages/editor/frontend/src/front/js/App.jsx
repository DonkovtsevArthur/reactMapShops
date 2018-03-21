import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from './store'
import Print from './containers/Print'
import AddPosition from './containers/AddPosition'
import AddGroup from './containers/AddGroup'

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Router>
				<React.Fragment>
					<Route exact path="/settings" component={Print} />
					<Route path="/addPosition/:uuid?" component={AddPosition} />
					<Route exact path="/addGroup/:uuid?" component={AddGroup} />
				</React.Fragment>
			</Router>
		</ConnectedRouter>
	</Provider>
)

render(<App />, global.document.getElementById('root'))
