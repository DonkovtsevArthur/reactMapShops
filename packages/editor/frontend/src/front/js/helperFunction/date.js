import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

export function calcDateArray(period) {
	switch (period) {
		case 'today':
		case 'yesterday': {
			const arr = []
			for (let i = 0; i < 24; i++) {
				arr.push(
					moment()
						.startOf('day')
						.hours(i)
						.format('LT')
				)
			}
			return arr
		}
		case '7days':
			return previouslyOn({ amount: 7, type: 'days', format: 'DD/MM' })
		case '30days':
			return previouslyOn({ amount: 30, type: 'days', format: 'DD/MM' })
		case 'year': {
			const arr = []
			for (let i = 0; i < 12; i++) {
				arr.push(
					moment()
						.startOf('month')
						.month(-i)
						.format('MM/YY')
				)
			}
			return arr.reverse()
		}
		default:
			return null
	}
}

function previouslyOn({ amount, type, format }) {
	const array = []
	for (let i = amount - 1; i >= 0; i--)
		array.push(
			moment()
				.subtract(i, type)
				.calendar(null, {
					sameDay: format, // '[Сегодня]',
					lastDay: format,
					lastWeek: format,
					sameElse: format
				})
		)
	return array
}

export function formatDate({ date, format }) {
	switch (format) {
		case 'today':
		case 'yesterday': {
			return `${moment()
				.startOf('day')
				.hours(date)
				.format('LT')}`
		}
		case '7days':
		case '30days':
			return moment(date).format('DD/MM')
		case 'year': {
			return moment(date, 'MM.YYYY').format('MM/YY')
		}
		default:
			return null
	}
}
