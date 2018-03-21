import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import columns from './columns'
// import Pagination from '../Pagination';

const Table = props => {
	const allColumns = columns(props)
	const tableColumns = props.columns.map(item => {
		const selectColumn = allColumns.filter(column => column.id === item.id)[0]
		if (item.name) {
			return {
				...selectColumn,
				show: item.show,
				header: () => (
					<div>
						{item.name}
						{item.icon ? <i className="fa fa-sort" /> : null}
					</div>
				)
			}
		}
		return {
			...selectColumn,
			show: item.show
		}
	})
	return (
		<div className="table__parent">
			<ReactTable
				data={props.products}
				columns={tableColumns}
				minRows={14}
				defaultPageSize={1000}
				showPagination={false}
				resizable={false}
				loading={props.status === 'load'}
				previousText="Предыдущая"
				nextText="Следующая"
				pageText="Старница"
				ofText="из"
				rowsText="строк"
				noDataText="Нет номенклатуры"
				loadingText="Загрузка..."
				manual
				onChange={state => {
					if (state.sorting.length > 0) {
						props.sortProducts(state.sorting[0].id, state.sorting[0].desc)
					}
				}}
			/>
		</div>
	)
}

Table.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string
		})
	).isRequired,
	status: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			show: PropTypes.bool.isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired,
	sortProducts: PropTypes.func.isRequired
}

export default Table
