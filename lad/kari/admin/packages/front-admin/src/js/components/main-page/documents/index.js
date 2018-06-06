import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import { getDocuments } from '~store/documents/actions'
import { getShops } from '~store/shops/actions'
import { getUsers } from '~store/users/actions'
import { shopsToSelect } from '~store/shops/selectors'
import { usersDataGetter } from '~store/users/selectors'
import styles from './index.scss'
import get from 'lodash/get'
import { dateFilters, getDateOfFilter } from '~utils/date'

const DocumentsTable = loadable(() => import('./table'))
const Select = loadable(() => import('~modules/select'))
// const DayPicker = loadable(() => import('~modules/day-picker'))

class DocumentsPage extends Component {
	state = {
		activeShop: '',
		activeDocumentType: '',
		dateFilter: 'week'
	}

	render() {
		const { shopsOptions, usersData } = this.props
		const { activeShop, activeDocumentType, dateFilter } = this.state
		if (!shopsOptions.length || !activeShop) return <div />

		const documentTypesOptions = [
			{ value: 'SELL', label: 'Продажа' },
			{ value: 'PAYBACK', label: 'Возврат' },
			{ value: 'OPEN_SESSION', label: 'Открытие сессии' },
			{ value: 'CLOSE_SESSION', label: 'Закрытие сессии' }
		]

		return (
			<section className={`${styles['page']} ${styles['documents-page']}`}>
				<h1>Документы</h1>
				<Select
					// className={styles[`-select`]}
					value={activeShop.length && shopsOptions.find(({ value }) => value === activeShop)}
					placeholder="Магазин"
					options={shopsOptions}
					onChange={this.handleChangeShop}
				/>
				<Select
					// className={styles[`-select`]}
					value={activeDocumentType.length && documentTypesOptions.find(({ value }) => value === activeDocumentType)}
					placeholder="Тип документа"
					options={documentTypesOptions}
					onChange={this.handleChangeDocumentType}
					isClearable
				/>
				<div className={styles['documents-date-filters']}>
					{dateFilters.map(({ value, label }) => {
						const handleClick = e => this.handleChangeDateFilter(value)
						return (
							<button
								className={`${styles['date-filter-button']} ${dateFilter === value && styles['active']}`}
								onClick={handleClick}
								key={`filter-${value}`}
							>
								{label}
							</button>
						)
					})}
					{/* <button
						className={`${styles['date-filter-button']} ${dateFilters.findIndex(({ value }) => value === dateFilter) <
							0 && styles['active']}`}
						onClick={() => this.handleChangeDateFilter()}
					>
						Иное
					</button> */}
					{/* <DayPicker /> */}
				</div>
				<DocumentsTable {...{ shopId: activeShop, documentsType: activeDocumentType, usersData }} />
			</section>
		)
	}

	async componentDidMount() {
		const { shopsOptions, usersData, getDocuments, getShops, getUsers } = this.props
		shopsOptions.length < 2 && (await getShops({ isAdmin: true }))
		const activeShop = this.props.shopsOptions[0].value
		await Promise.all([
			getDocuments({
				dateStart: getDateOfFilter({ filter: this.state.dateFilter }),
				dateEnd: getDateOfFilter({ filter: 'now' })
			}),
			getUsers()
		])
		this.setState({ activeShop })
	}

	handleChangeShop = async ({ value: storeId }) => {
		await this.props.getDocuments({
			store: storeId,
			dateStart: getDateOfFilter({ filter: this.state.dateFilter }),
			dateEnd: getDateOfFilter({ filter: 'now' })
		})
		this.setState({ activeShop: storeId })
	}

	handleChangeDocumentType = props => this.setState({ activeDocumentType: get(props, 'value', '') })

	handleChangeDateFilter = async (dateFilter = 'other') => {
		await this.props.getDocuments({
			[this.state.activeShop !== 'ALL' && 'store']: this.state.activeShop,
			dateStart: getDateOfFilter({ filter: dateFilter === 'now' ? 'today' : dateFilter }),
			dateEnd: getDateOfFilter({ filter: 'now' })
		})
		this.setState({ dateFilter })
	}
}

const mapStateToProps = ({ shops, users }) => ({
	shopsOptions: shopsToSelect({ shops }, { isDefault: true }),
	usersData: usersDataGetter({ users })
})
const mapDispatchToProps = dispatch => bindActionCreators({ getDocuments, getShops, getUsers }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(DocumentsPage))
