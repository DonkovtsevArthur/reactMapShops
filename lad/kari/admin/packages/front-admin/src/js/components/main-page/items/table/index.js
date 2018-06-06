import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getItems } from '~store/items/actions'
import loadable from 'loadable-components'
import { itemsFromShopFactory } from '~store/items/selectors'
import get from 'lodash/get'
import styles from './index.scss'

const Table = loadable(() => import('~modules/table'))
// const TablePopup = loadable(() => import('./popup'))

class ItemsTable extends Component {
	state = {}
	componentDidMount() {
		const { storeId, getItems } = this.props
		getItems({ storeId, limit: 50, offset: 0 })
	}

	handlePagination = async ({ pageSize, needPage }) => {
		const limit = pageSize,
			offset = (needPage - 1) * pageSize,
			{ storeId, items, getItems } = this.props

		if ([items.list[offset], items.list[limit]].some(el => typeof el === 'undefined'))
			return await getItems({ storeId, limit, offset })
	}

	render() {
		if (!this.props.items.list.length) return <div />
		const { quantityItems } = this.props.items

		const columns = [
			{ label: '№', styleName: styles['number-column'], field: '' },
			{
				label: '',
				styleName: styles['img-column'],
				fieldFormat: ({ media }) => {
					const src = get(media, 'photo[0]', '')
					return src.length ? <img src={src} decoding="async" alt="" /> : <div className={styles['placeholder']} />
				}
			},
			{
				label: 'Название',
				styleName: styles['name-column'],
				fieldFormat: ({ name }) => name
			},
			{
				label: 'Цена',
				styleName: styles['price-column'],
				fieldFormat: ({ price }) => <span>{price}</span>
			},
			{
				label: 'Количество',
				styleName: styles['amount-column'],
				fieldFormat: ({ quantity }) => quantity
			}
		]
		return (
			<Table
				{...{
					data: { data: this.props.items.data, list: this.props.items.list, realQuantity: quantityItems },
					customPagination: this.handlePagination,
					columns: columns,
					styleName: styles['items-table']
				}}
			/>
		)
	}
}

const mapStateToProps = (store, props) => {
	const itemsSelector = itemsFromShopFactory()
	return (store, props) => ({
		items: itemsSelector(store, props)
	})
}
const mapDispatchToProps = dispatch => bindActionCreators({ getItems }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(ItemsTable))
