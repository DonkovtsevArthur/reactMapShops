import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

export function formatDate(period) {
	switch (period) {
		case 'year':
			return {
				actual: moment()
					.add(-12, 'month')
					.utc()
					.format('YYYY-MM-DD HH:mm:00'),
				prev: moment()
					.add(-24, 'month')
					.utc()
					.format('YYYY-MM-DD HH:mm:00'),
				duration: moment.duration(12, 'months').asSeconds()
			}
		case '30days':
			return {
				actual: moment()
					.add(-30, 'days')
					.utc()
					.format('YYYY-MM-DD HH:mm:00'),
				prev: moment()
					.add(-60, 'days')
					.utc()
					.format('YYYY-MM-DD HH:mm:00'),
				duration: moment.duration(30, 'days').asSeconds()
			}
		case '7days':
			return {
				actual: moment()
					.add(-7, 'days')
					.utc()
					.format('YYYY-MM-DD HH:mm:00'),
				prev: moment()
					.add(-14, 'days')
					.utc()
					.format('YYYY-MM-DD HH:mm:00'),
				duration: moment.duration(7, 'days').asSeconds()
			}
		case 'yesterday':
			return {
				actual: moment()
					.add(-1, 'days')
					.utc()
					.format('YYYY-MM-DD 00:00:00'),
				prev: moment()
					.add(-2, 'days')
					.utc()
					.format('YYYY-MM-DD 00:00:00'),
				duration: moment.duration(1, 'days').asSeconds()
			}
		case 'today':
			return {
				actual: moment()
					.utc()
					.format('YYYY-MM-DD 00:00:00'),
				prev: moment()
					.add(-1, 'days')
					.utc()
					.format('YYYY-MM-DD 00:00:00'),
				duration: moment.duration(1, 'days').asSeconds()
			}
		default:
			return {
				actual: moment()
					.utc()
					.format('YYYY-MM-DD 00:00:00'),
				prev: moment()
					.add(-1, 'days')
					.utc()
					.format('YYYY-MM-DD 00:00:00'),
				duration: moment.duration(1, 'days').asSeconds()
			}
	}
}

export function getDateLimit({ dateField, widgetConfig, period }) {
	const downDateLimit = period ? `${dateField} > toDateTime('${formatDate(period).actual}')` : ''

	const upDateLimit =
		period === 'yesterday'
			? `AND ${dateField} < toDateTime('${moment()
					.utc()
					.format('YYYY-MM-DD 00:00:00')}')`
			: ''
	return downDateLimit ? `WHERE ${downDateLimit} ${upDateLimit}` : ''
}

export function getDateLimitWithPrev({ dateField, widgetConfig, period }) {
	const downDateLimitActual = period
		? `${dateField} > toDateTime('${formatDate(period).actual}')`
		: ''

	const upDateLimitActual =
		period === 'yesterday'
			? `AND ${dateField} < toDateTime('${moment()
					.utc()
					.format('YYYY-MM-DD 00:00:00')}')`
			: ''

	const downDateLimitPrev = period ? `${dateField} > toDateTime('${formatDate(period).prev}')` : ''

	const upDateLimitPrev = period
		? `AND ${dateField} < toDateTime('${formatDate(period).actual}')`
		: ''

	return {
		actual: downDateLimitActual ? `${downDateLimitActual} ${upDateLimitActual}` : '',
		prev: downDateLimitPrev ? `${downDateLimitPrev} ${upDateLimitPrev}` : '',
		all: `${downDateLimitPrev} ${upDateLimitActual}`,
		duration: formatDate(period).duration
	}
}
