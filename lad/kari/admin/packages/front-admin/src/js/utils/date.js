import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

export const dateFilters = [
	{ value: 'now', label: 'Сейчас' },
	// { value: 'today', label: 'Сегодня' },
	{ value: 'yesterday', label: 'Вчера' },
	{ value: 'week', label: 'Неделя' },
	{ value: 'month', label: 'Месяц' },
	{ value: 'year', label: 'Год' }
]

export function dateToDate({ date }) {
	return moment(date).format()
}

export function dateToDMY({ date }) {
	return moment(date).format('L')
}

export function dateToDMYHM({ date }) {
	return moment(date).format('L LT')
}

export function getDateOfFilter({ filter }) {
	switch (filter) {
		case 'now': {
			return moment().format('YYYY-MM-DD HH:mm:ss')
		}

		case 'today': {
			return moment()
				.startOf('day')
				.format('YYYY-MM-DD HH:mm:ss')
		}

		case 'yesterday': {
			return moment()
				.startOf('day')
				.subtract(1, 'days')
				.format('YYYY-MM-DD HH:mm:ss')
		}
		case 'week': {
			return moment()
				.startOf('day')
				.subtract(7, 'days')
				.format('YYYY-MM-DD HH:mm:ss')
		}
		case 'month': {
			return moment()
				.startOf('day')
				.subtract(1, 'month')
				.format('YYYY-MM-DD HH:mm:ss')
		}
		case 'year': {
			return moment()
				.startOf('day')
				.subtract(1, 'year')
				.format('YYYY-MM-DD HH:mm:ss')
		}
	}
}
