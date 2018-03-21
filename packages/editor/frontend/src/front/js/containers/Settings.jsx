import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import setToken from '../actions/user'
import PrinterSettings from './PrinterSetings'
import Templates from './Templates'
import Elements from './Elements'

class Settings extends Component {
	componentWillMount() {
		const search = this.props.location.search
		const token = search.substring(search.indexOf('=') + 1, search.indexOf('&'))
		this.props.setToken(token)
	}

	render() {
		return (
			<div>
				<PrinterSettings />
				<Templates />
				<Elements />
			</div>
		)
	}
}

Settings.propTypes = {
	location: PropTypes.shape({
		search: PropTypes.string.isRequired
	}).isRequired,
	setToken: PropTypes.func.isRequired
}

Settings = connect(() => ({}), dispatch => bindActionCreators({ setToken }, dispatch))(Settings)

export default Settings
