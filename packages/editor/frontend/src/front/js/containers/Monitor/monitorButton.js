import React from 'react'
import PropTypes from 'prop-types'

MonitorButton.propTypes = {
	changeMonitorVisible: PropTypes.func.isRequired
}

function MonitorButton({ changeMonitorVisible }) {
	return <monitor-open-button onClick={changeMonitorVisible} data-title="Аналитика" />
}

export default MonitorButton
