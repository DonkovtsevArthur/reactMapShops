import React, { Component } from 'react'
import MonitorButton from './monitorButton'
import MonitorPopup from './monitorPopup'

class Monitor extends Component {
	state = {
		isVisible: false
	}

	render() {
		const { isVisible } = this.state
		return (
			<React.Fragment>
				<MonitorButton changeMonitorVisible={this.changeMonitorVisible} />
				<MonitorPopup isVisible={isVisible} changeMonitorVisible={this.changeMonitorVisible} />
			</React.Fragment>
		)
	}

	changeMonitorVisible = () => {
		this.setState(prevState => ({ isVisible: !prevState.isVisible }))
	}
}

export default Monitor
