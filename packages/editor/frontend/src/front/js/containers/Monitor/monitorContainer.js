import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as monitorActions from '../../actions/monitor'
import MonitorSlider from './monitorSlider'

class MonitorContainer extends Component {
	static propTypes = {
		monitor: PropTypes.shape({
			dashboards: PropTypes.object.isRequired,
			loadingMonitor: PropTypes.oneOf([null, true, false])
		}).isRequired,
		products: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		preloadMonitor: PropTypes.func.isRequired,
		updateMonitor: PropTypes.func.isRequired
	}

	state = {
		filterDate: '7days'
	}

	componentWillMount() {
		this.props.preloadMonitor({
			evotorToken: this.props.location.search.split('auth=')[1],
			period: this.state.filterDate
		})
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props.monitor.loadingMonitor === false)
			if (
				nextProps.products.activePosition.product !== this.props.products.activePosition.product ||
				nextProps.products.activePosition.group !== this.props.products.activePosition.group
			) {
				this.props.updateMonitor({ period: nextState.filterDate })
			} else if (nextState.filterDate !== this.state.filterDate) {
				this.props.updateMonitor({ period: nextState.filterDate })
			} else if (nextProps.products.navGroup !== this.props.products.navGroup)
				this.props.updateMonitor({ period: nextState.filterDate })
	}

	render() {
		const { monitor } = this.props
		const { filterDate } = this.state
		return (
			<monitor-container>
				{dateFilterButtons({
					filterDate,
					changeDateFilter: this.changeDateFilter
				})}
				{monitor.loadingMonitor !== false
					? monitorLoader()
					: monitorBody({ ...monitor, filterDate })}
			</monitor-container>
		)
	}

	changeDateFilter = (event, value) => {
		if (this.state.filterDate !== value) this.setState({ filterDate: value })
	}
}

monitorBody.propTypes = {
	widgetConfigs: PropTypes.object.isRequired,
	widgetData: PropTypes.object.isRequired,
	dashboards: PropTypes.object.isRequired,
	filterDate: PropTypes.string.isRequired
}

function monitorLoader() {
	return (
		<custom-loader class="folding-cube">
			<div className="cube1 cube" />
			<div className="cube2 cube" />
			<div className="cube4 scube" />
			<div className="cube3 cube" />
		</custom-loader>
	)
}

function monitorBody({ widgetConfigs, widgetData, dashboards, filterDate }) {
	const counts = [],
		lines = [],
		activeDashboard = whatDashboardNeedToLoad(dashboards)

	for (let widgetId in widgetConfigs[activeDashboard]) {
		const dash = widgetConfigs[activeDashboard][widgetId]
		switch (dash.graph) {
			case 'count': {
				counts.push(dash)
				break
			}
			case 'line': {
				lines.push(dash)
				break
			}
			default:
				console.log('Незнакомый тип виджета')
		}
	}

	function compare(a, b) {
		if (a.index > b.index) return 1
		if (a.index < b.index) return -1
		return 0
	}

	return (
		<React.Fragment>
			{lines.length && (
				<MonitorSlider
					lineConfigs={lines.sort(compare)}
					widgetData={widgetData}
					dashboardId={activeDashboard}
					filterDate={filterDate}
					countersData={counts.sort(compare)}
				/>
			)}
		</React.Fragment>
	)
}

function dateFilterButtons({ filterDate, changeDateFilter }) {
	const dateDataArr = [
		['today', 'Сегодня'],
		['yesterday', 'Вчера'],
		['7days', 'Неделя'],
		['30days', 'Месяц'],
		['kvartal', 'Квартал', 'disabled'],
		['year', 'Год']
	]

	const dateFilterButtons = dateDataArr.map(buttonData => {
		const [filter, title, disabled] = buttonData
		const handleButton = event => changeDateFilter(event, filter)
		return (
			<button
				onClick={handleButton}
				className={filterDate === filter ? 'active' : disabled === 'disabled' ? 'disabled' : ''}
				key={filter}
			>
				{title}
			</button>
		)
	})

	return <monitor-date>{dateFilterButtons}</monitor-date>
}

function whatDashboardNeedToLoad(data) {
	const dashboards = Object.entries(data)
	for (let i = 0; i < dashboards.length; i++)
		if (dashboards[i][1].active) {
			return dashboards[i][0]
		}
}

const mapStateToProps = state => ({
	monitor: state.monitor,
	products: state.products,
	location: state.routing.location,
	auth: state.auth
})

const mapDispatchToProps = dispatch => bindActionCreators({ ...monitorActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MonitorContainer)
