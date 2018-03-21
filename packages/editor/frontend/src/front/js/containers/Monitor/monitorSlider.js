import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SlickSlider from 'react-slick'
import Bar from '../Widgets/Bar'
import WidgetCounter from './../Widgets/Counter'

class MonitorSlider extends Component {
	static propTypes = {
		filterDate: PropTypes.string.isRequired,
		lineConfigs: PropTypes.array.isRequired,
		widgetData: PropTypes.object.isRequired,
		countersData: PropTypes.array.isRequired,
		dashboardId: PropTypes.string.isRequired
	}

	state = {
		activeWidget: 0
	}

	render() {
		const { lineConfigs, widgetData, dashboardId, filterDate, countersData } = this.props
		const { activeWidget } = this.state
		const sliderSettings = {
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			afterChange: newSlide => {
				const { activeWidget } = this.state
				if (activeWidget !== newSlide) {
					this.setState({
						activeWidget: newSlide
					})
				}
			}
		}

		const lines = lineConfigs.map(config => {
			return (
				<div key={config.appId}>
					<Bar graphData={widgetData[dashboardId][config.appId]} filterDate={filterDate} />
				</div>
			)
		})

		const counters = countersData.map((config, index) => {
			return (
				<WidgetCounter
					widgetConfig={config}
					widgetData={widgetData[dashboardId][config.appId]}
					isActive={activeWidget === index}
					key={config.appId}
					clickHandler={() => this.changeSlide(index)}
					filterDate={filterDate}
				/>
			)
		})

		return (
			<React.Fragment>
				{<monitor-counters>{counters}</monitor-counters>}
				<SlickSlider ref="slider" {...sliderSettings}>
					{lines}
				</SlickSlider>
			</React.Fragment>
		)
	}

	changeSlide = index => {
		this.refs.slider.slickGoTo(index)
		this.setState({
			activeWidget: index
		})
	}
}

export default MonitorSlider
