import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import numeral from 'numeral'
import '../../helperFunction/numeral'

WidgetCounter.propTypes = {
	widgetConfig: PropTypes.object.isRequired,
	widgetData: PropTypes.array.isRequired,
	clickHandler: PropTypes.func,
	isActive: PropTypes.bool
}

function WidgetCounter({ widgetConfig, widgetData, clickHandler, isActive }) {
	const descriptionArray = get(widgetConfig, 'dataSourceConfig[0].items')
	const typeCounter = descriptionArray.findIndex(el => el.name === widgetConfig.index)
	const counterTitle = getCounterTitle({ type: descriptionArray[typeCounter].name })
	const currentValue = get(widgetData, '[0].x')
	const oldValue = get(widgetData, '[0].x1')

	const changeData = calcСhangeData({ now: currentValue, old: oldValue })
	const currency = descriptionArray[typeCounter].type !== 'String' ? ' ₽' : ''

	const counterValue =
		typeof currentValue !== 'undefined' && typeof oldValue !== 'undefined' ? (
			<React.Fragment>
				<p>{numeral(currentValue).format('0,0[.]00') + currency}</p>
				<span className={changeData < 0 ? 'negative' : ''}>{changeData}%</span>
			</React.Fragment>
		) : (
			''
		)

	if (typeof currentValue === 'undefined' && typeof oldValue === 'undefined') {
		return <monitor-no-data>Нет данных</monitor-no-data>
	}

	return (
		<widget-counter onClick={clickHandler} class={isActive ? 'active' : ' '}>
			<widget-counter-text>
				<widget-counter-title>{counterTitle}</widget-counter-title>
				<widget-counter-value>{counterValue}</widget-counter-value>
			</widget-counter-text>
		</widget-counter>
	)
}

function calcСhangeData({ old, now }) {
	const value = (now - old) / (now + old) * 100
	return value === 0 ? 0 : value.toFixed(1)
}

function getCounterTitle({ type }) {
	switch (type) {
		case 'closeResultSum':
			return 'Выручка'
		case 'profit':
			return 'Прибыль'
		case 'documentUuid':
			return 'Количество'

		default:
			return ''
	}
}

export default WidgetCounter
