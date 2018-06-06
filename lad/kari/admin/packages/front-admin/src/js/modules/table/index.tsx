import React, { Component } from 'react'
import Pagination from './pagination'
import TableBody from './table-body'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

class Table extends Component {
	state = {
		page: 1,
		pageSize: 50
	}

	render() {
		const { columns, data, styleName, TablePopup, customPagination, activePage, ...rest } = this.props

		if (!data.list.length)
			return (
				<section className={`${styles['block-for-table']} ${styleName}`}>
					<div className={styles['no-data-label']}>
						<p>Нет данных</p>
					</div>
				</section>
			)

		const { page, pageSize } = this.state
		const totalPages = Math.ceil(data['list'].length / pageSize)
		const { changeActivePage, changePageSize } = this
		return (
			<section className={`${styles['block-for-table']} ${styleName}`}>
				<Pagination
					{...{
						changeActivePage,
						changePageSize,
						totalPages,
						pageSize,
						realQuantity: data.realQuantity,
						page: activePage ? activePage : page,
						customPagination
					}}
				/>
				<table className={styles['table']}>
					<TableBody {...{ data, page, pageSize, columns, TablePopup, ...rest }} />
				</table>
			</section>
		)
	}

	changeActivePage = ({ page }) => {
		this.setState({ page })
	}

	changePageSize = ({ pageSize }) => {
		this.setState({ pageSize, page: 1 })
	}
}

export default hot(module)(Table)
