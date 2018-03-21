import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import json2csv from 'json2csv'
import iconv from 'iconv-lite'
import fileDownload from 'react-file-download'
import Blob from 'blob'

// actions
import * as menu from '../actions/menu'
import * as clearQuantity from '../actions/clearQuantity'

// components
import MenuButton from '../components/MenuButton'

// constants
import { PRODUCT_FIELDS, PRODUCT_FIELDS_LOCAL } from '../../../constants'

// helper
import { getNameString } from '../helperFunction'
import jsonToHtmlParser from '../helperFunction/jsonToHtmlParser'

class Container extends Component {
	constructor() {
		super()
		this.exportFile = this.exportFile.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.showFuncBlock) {
			global.document.addEventListener('click', this.props.funcBlockHide)
		}
		if (this.props.showFuncBlock && !nextProps.showFuncBlock) {
			global.document.removeEventListener('click', this.props.funcBlockHide)
		}
	}
	exportFile(saveAs) {
		const productList = this.props.productList
		const marketList = this.props.marketList
		const market = this.props.market
		const data = this.props.productList.map(product => {
			const parentUuid = getNameString(product.parentUuid, productList, marketList, market)
			const barCodes = product.barCodes.join(' , ')
			const allowToSell = product.allowToSell ? 'Да' : 'Нет'
			return {
				...product,
				parentUuid,
				barCodes,
				allowToSell
			}
		})
		data.sort((a, b) => {
			if (a.parentUuid > b.parentUuid) return -1
			if (a.parentUuid < b.parentUuid) return 1
			if (a.parentUuid === b.parentUuid) {
				if (a.name < b.name) return -1
				if (a.name > b.name) return 1
				return 0
			}
			return 0
		})
		let result
		let decodeResult
		switch (saveAs) {
			case 'csv':
				result = json2csv({
					data,
					fields: PRODUCT_FIELDS,
					fieldNames: PRODUCT_FIELDS_LOCAL
				})
				decodeResult = iconv.encode(result, 'win1251')
				fileDownload(new Blob([decodeResult]), 'products.csv')
				return true
			case 'xls':
				result = jsonToHtmlParser(PRODUCT_FIELDS, PRODUCT_FIELDS_LOCAL, data)
				decodeResult = iconv.encode(result, 'win1251')
				fileDownload(new Blob([decodeResult]), 'products.xls')
				return true
			default:
				return false
		}
	}
	render() {
		return (
			<div>
				<MenuButton {...this.props} exportFile={this.exportFile} />
			</div>
		)
	}
}

Container.propTypes = {
	funcBlockHide: PropTypes.func.isRequired,
	showFuncBlock: PropTypes.bool.isRequired,
	productList: PropTypes.arrayOf(PropTypes.object).isRequired,
	marketList: PropTypes.arrayOf(PropTypes.object).isRequired,
	market: PropTypes.string
}

Container.defaultProps = {
	market: ''
}

const Menu = connect(
	state => ({
		...state.menu,
		productList: state.products.productList,
		marketList: state.markets.marketList,
		market: state.markets.selected
	}),
	dispatch =>
		bindActionCreators(
			{
				...menu,
				...clearQuantity
			},
			dispatch
		)
)(Container)

export default Menu
