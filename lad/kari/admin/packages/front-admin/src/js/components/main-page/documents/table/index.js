import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import { documentsFromShop } from '~store/documents/selectors'
import styles from './index.scss'
import get from 'lodash/get'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./popup'))

class DocumentsTable extends Component {
	render() {
		const columns = [
			{ label: '№', styleName: styles['number-column'], field: '' },
			{
				label: 'Тип',
				styleName: styles['type-column'],
				fieldFormat: ({ type }) => {
					switch (type) {
						case 'SELL': {
							return <span className={styles['green']}>Продажа</span>
						}
						case 'PAYBACK': {
							return <span className={styles['red']}>Возврат</span>
						}
						case 'OPEN_SESSION': {
							return <span className={styles['orange']}>Открытие сессии</span>
						}
						case 'CLOSE_SESSION': {
							return <span className={styles['fiol']}>Закрытие сессии</span>
						}
						default: {
							return <span>Неизвестная операция</span>
						}
					}
				}
			},
			{
				label: 'Сумма',
				styleName: styles['close-result-sum-column'],
				fieldFormat: ({ closeResultSum }) => closeResultSum
			},
			{
				label: 'С скидкой',
				styleName: styles['close-sum-column'],
				fieldFormat: ({ closeSum }) => closeSum
			},
			{
				label: 'Пользователь',
				styleName: styles['user-column'],
				fieldFormat: ({ userUuid }) => {
					const { surname = '', name = '' } = get(this.props.usersData[userUuid], 'meta', {})
					return `${surname.length && `${surname} `}${name}`
				}
			},
			{
				label: 'Дата открытия',
				styleName: styles['open-date'],
				fieldFormat: ({ openDate }) => openDate
			},
			{
				label: 'Дата закрытия',
				styleName: styles['close-date'],
				fieldFormat: ({ closeDate }) => closeDate
			}
			// {
			// 	label: 'Number',
			// 	styleName: styles['number-column'],
			// 	fieldFormat: ({ number }) => number
			// },
			// {
			// 	label: 'sessionNumber',
			// 	styleName: styles['session-number-column'],
			// 	fieldFormat: ({ sessionNumber }) => sessionNumber
			// },
		]

		return (
			<Table
				{...{
					data: this.props.documents,
					columns: columns,
					TablePopup,
					styleName: styles['documents-table']
				}}
			/>
		)
	}
}

const mapStateToProps = (store, props) => {
	const documentsSelector = documentsFromShop()
	return (store, props) => ({
		documents: documentsSelector(store, props)
	})
}

export default hot(module)(connect(mapStateToProps)(DocumentsTable))
