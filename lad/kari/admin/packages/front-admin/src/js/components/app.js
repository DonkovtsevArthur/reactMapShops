import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import MainPage from './main-page'
import Authorization from './authorization'

class App extends Component {
	render() {
		const { loadingToken } = this.props.auth
		return (
			<Fragment>
				<Switch>
					<Route path={`/`} component={loadingToken !== false ? Authorization : MainPage} />
				</Switch>
			</Fragment>
		)
	}
}

const mapStateToProps = ({ auth, routing: { location } }) => ({ auth, location })

export default hot(module)(connect(mapStateToProps)(App))
