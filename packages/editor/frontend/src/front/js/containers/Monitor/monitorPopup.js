import React from 'react'
import PropTypes from 'prop-types'
import MonitorContainer from './monitorContainer'

MonitorPopup.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	changeMonitorVisible: PropTypes.func.isRequired
}

function MonitorPopup({ isVisible, changeMonitorVisible }) {
	return (
		<monitor-popup class={!isVisible ? 'hidden' : ''}>
			<monitor-close onClick={changeMonitorVisible} />
			<MonitorContainer />
		</monitor-popup>
	)
}

export default MonitorPopup
