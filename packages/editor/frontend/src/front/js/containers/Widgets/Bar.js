import React from 'react'
import PropTypes from 'prop-types'
import { calcDateArray, formatDate } from '../../helperFunction/date'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory'
import numeral from 'numeral'
// import '../../helperFunction/numeral'

const axisStyle = {
	fontSize: '14px',
	lineHeight: '14px',
	fontWeight: '600',
	fill: '#B8B2C2',
	fontFamily: "'Open Sans', sans-serif"
}

Bar.propTypes = {
	filterDate: PropTypes.string.isRequired,
	graphData: PropTypes.array.isRequired
}

function Bar({ filterDate, graphData }) {
	const dateArray = calcDateArray(filterDate)
	const formatData = []
	let maxValue = 0
	dateArray.map((date, index) => {
		const i = graphData.findIndex(el => date === formatDate({ date: el.x, format: filterDate }))
		if (i >= 0) maxValue = graphData[i].y > maxValue ? graphData[i].y : maxValue
		formatData.push({
			x: date,
			y: i >= 0 ? parseFloat(graphData[i].y) : 0
		})
	})

	if (filterDate === '7days' || filterDate === '30days') {
		dateArray[dateArray.length - 1] = 'Сегодня'
		formatData[formatData.length - 1].x = 'Сегодня'
	}

	if (maxValue === 0) {
		return <div />
	}

	return (
		<VictoryChart domainPadding={60} width={1000} height={400}>
			<VictoryAxis
				fixLabelOverlap
				tickValues={dateArray}
				style={{
					axis: { stroke: 'rgba(230, 227, 232, 0.5)', width: '1px' },
					grid: { stroke: 'transparent' },
					tickLabels: axisStyle
				}}
			/>
			<VictoryAxis
				dependentAxis
				tickFormat={x => x}
				style={{
					axis: { stroke: 'transparent', width: '1px' },
					grid: { stroke: 'rgba(230, 227, 232, 0.5)', width: '1px' },
					tickLabels: axisStyle
				}}
			/>
			<VictoryBar
				data={formatData}
				x="x"
				y="y"
				labels={d => numeral(parseFloat(d.y)).format('0,0[.]00')}
				labelComponent={<VictoryTooltip />}
				cornerRadius={2}
				style={{ data: { fill: '#4d6df7' } }}
			/>
		</VictoryChart>
	)
}

export default Bar
