import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
// import pino from 'pino';
// import classNames from 'classnames';

// actions
import * as actionsMarkets from '../actions/markets'
import * as actionsProducts from '../actions/products'
import * as actionsPrinter from '../actions/printerSettings'
import * as tableControl from '../actions/tableControl'
import * as formActions from '../actions/formActions'
import setToken from '../actions/user'
import * as quantityPopUp from '../actions/quantityPopUp'

// container
import QuantityPopUp from './QuantityPopUp'
import Menu from './/Menu'
import ClearQuantity from './ClearQuantity'
import Monitor from './Monitor'

// components
import Store from '../components/Store'
import Table from '../components/Table'
import SearchProduct from '../components/SearchProduct'
import ErrorMessage from '../components/ErrorMessage'
import Breadcrumbs from '../components/Breadcrumbs'
import TableControl from '../components/TableControl'

// const logger = pino();

class Print extends Component {
	constructor() {
		super()
		this.loadMarkets = this.loadMarkets.bind(this)
		this.loadProducts = this.loadProducts.bind(this)
		this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
	}

	componentWillMount() {
		const search = this.props.location.search
		const token = search.substring(search.indexOf('=') + 1, search.indexOf('&'))
		if (!this.props.token) {
			this.props.setToken(token)
		}
		if (!this.props.markets.selected) {
			this.props.loadMarkets(this.props.token || token)
		}
		if (!this.props.printerSettings.selectedPrinter) {
			this.props.getListPrinter()
		}
	}

	componentWillReceiveProps(nextProps) {
		const newSelected = nextProps.markets.selected
		const oldSelected = this.props.markets.selected
		const setDefaultMarkets = !oldSelected && newSelected
		const changeMarkets = oldSelected && oldSelected !== newSelected

		const pushCount = nextProps.count
		const pushProducts = pushCount > 0

		if (setDefaultMarkets || changeMarkets || pushProducts) {
			this.props.loadProducts(this.props.token, newSelected)
			this.props.clearCount()
		}
	}

	componentWillUnmount() {
		this.props.clearSort()
	}

	loadMarkets() {
		const status = this.props.markets.status
		const marketList = this.props.markets.marketList
		const selected = this.props.markets.selected
		const navGroup = this.props.products.navGroup

		const names = navGroup.map(uuid => {
			const name = this.props.products.productList.filter(item => item.uuid === uuid)
			return { name: name[0].name, uuid: name[0].uuid }
		})

		names.unshift({ name: '/ Все', uuid: '' })

		switch (status) {
			case 'load':
				return <i className="fa fa-cog fa-spin fa-2x fa-fw" />
			case 'success':
				return (
					<div className="print__topControl">
						<div className="breadcrumbs__main">
							<Store
								{...this.props}
								selectedName={marketList.filter(item => item.uuid === selected)[0].name}
							/>
							<Breadcrumbs {...this.props} names={names} />
						</div>
						<div className="print__func">
							<div className="table__control">
								<Link to="/addPosition" className="btn btn__addposition">
									<i className="fa fa-plus-circle table__plus" /> Позиция
								</Link>
								<Link to="/addGroup" className="btn btn__addgroup">
									<i className="fa fa-plus-circle table__plus" /> Группа
								</Link>
							</div>
							<SearchProduct
								searchString={this.props.products.searchString}
								setSearchString={this.props.setSearchString}
							/>
							<Monitor />
							<Menu />
						</div>
					</div>
				)
			case 'error':
				return <p className="store__error">Магазинов не найдено!</p>
			default:
				return <i className="fa fa-cog fa-spin fa-2x fa-fw" />
		}
	}

	handleDeleteProduct(e) {
		e.preventDefault()
		const products = this.props.products.productList
		const activeElements = products.filter(item => item.active)
		const uuids = activeElements.map(item => ({ uuid: item.uuid }))
		this.props.deleteProduct(this.props.token, this.props.markets.selected, uuids)
	}

	loadProducts() {
		const elements = {
			groups: 0,
			positions: 0
		}
		const status = this.props.products.status
		const productList = this.props.products.productList
		const count = this.props.products.count
		const navGroup = this.props.products.navGroup
		const filteredProducts = productList.filter(item => {
			const navUuid = navGroup[navGroup.length - 1] || null
			if (item.parentUuid !== navUuid) return false
			const searchString = this.props.products.searchString.toUpperCase()
			if (searchString) {
				const name = item.name ? item.name.toUpperCase() : ''
				if (name.indexOf(searchString) >= 0) {
					if (item.group) {
						elements.groups += 1
					} else {
						elements.positions += 1
					}
					return true
				}
				return false
			}
			if (item.group) {
				elements.groups += 1
			} else {
				elements.positions += 1
			}
			return true
		})
		// for (key in elements) {
		//   filteredProducts.filter(item => (key === item.uuid));
		// }
		let sortingProduct
		if (!this.props.products.sorted) {
			sortingProduct = filteredProducts.sort((a, b) => {
				if (a.group === b.group) {
					return 0
				}
				if (a.group && !b.group) {
					return -1
				}
				if (!a.group && b.group) {
					return 1
				}
				return false
			})
		} else {
			sortingProduct = filteredProducts
		}

		if (navGroup.length > 0) {
			sortingProduct.unshift({
				name: '...',
				id: 'up',
				group: true
			})
		}

		switch (status) {
			case 'load':
			case 'success':
				return (
					<div id="productsTable">
						<Table
							products={sortingProduct}
							count={count}
							toggleProduct={this.props.toggleProduct}
							moveCountPrint={this.props.moveCountPrint}
							setCountPrint={this.props.setCountPrint}
							clearAllCount={this.props.clearAllCount}
							clearCount={this.props.clearCount}
							status={this.props.status}
							setNavGroup={this.props.setNavGroup}
							upNavGroup={this.props.upNavGroup}
							columns={this.props.tableControl.column}
							controlVisible={this.props.controlVisible}
							controlInvisible={this.props.controlInvisible}
							toggleColumn={this.props.toggleColumn}
							toggleVisible={this.props.toggleVisible}
							sortProducts={this.props.sortProducts}
							visible={this.props.tableControl.visible}
							openPopUp={this.props.openPopUp}
						/>
						<TableControl
							parrent="productsTable"
							status={this.props.products.status}
							elements={elements}
							selectedGroup={this.props.products.activePosition.group}
							selectedProducts={this.props.products.activePosition.product}
							deleteProducts={this.handleDeleteProduct}
							products={this.props.products}
							addToBuffer={this.props.addToBuffer}
							cancelCutProducts={this.props.cancelCutProducts}
							insertProduct={this.props.insertProduct}
						/>
					</div>
				)
			case 'error':
				return <ErrorMessage message="Ошибка загрузки!" />
			default:
				return (
					<span>
						Загрузка номенклатуры...
						<i className="fa fa-cog fa-spin fa fa-fw table" />
					</span>
				)
		}
	}

	openPopUp() {
		if (this.props.quantityPopUp.showQuantityPopUp) {
			return <QuantityPopUp />
		}
		return null
	}

	render() {
		return (
			<div>
				<ClearQuantity />
				{this.openPopUp()}
				{this.loadMarkets()}
				{this.loadProducts()}
			</div>
		)
	}
}

Print.propTypes = {
	token: PropTypes.string.isRequired,
	loadMarkets: PropTypes.func.isRequired,
	markets: PropTypes.shape({
		status: PropTypes.string.isRequired,
		selected: PropTypes.string,
		message: PropTypes.string,
		marketList: PropTypes.arrayOf(
			PropTypes.shape({
				uuid: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired,
	products: PropTypes.shape({
		status: PropTypes.string.isRequired,
		message: PropTypes.string,
		selectedAll: PropTypes.bool.isRequired,
		count: PropTypes.number.isRequired,
		searchString: PropTypes.string.isRequired,
		navGroup: PropTypes.arrayOf(PropTypes.string).isRequired,
		productList: PropTypes.arrayOf(
			PropTypes.shape({
				uuid: PropTypes.string.isRequired,
				active: PropTypes.bool.isRequired,
				countPrint: PropTypes.number.isRequired
			})
		).isRequired,
		sorted: PropTypes.bool.isRequired,
		sorting: PropTypes.shape({
			name: PropTypes.string,
			direct: PropTypes.bool
		}).isRequired,
		activePosition: PropTypes.shape({
			group: PropTypes.number.isRequired,
			product: PropTypes.number.isRequired
		}).isRequired
	}).isRequired,
	changeMarket: PropTypes.func.isRequired,
	loadProducts: PropTypes.func.isRequired,
	toggleProduct: PropTypes.func.isRequired,
	moveCountPrint: PropTypes.func.isRequired,
	setCountPrint: PropTypes.func.isRequired,
	print: PropTypes.func.isRequired,
	printerSettings: PropTypes.shape({
		message: PropTypes.string.isRequired,
		printerStatus: PropTypes.string.isRequired,
		intervalId: PropTypes.number.isRequired,
		selectedPrinter: PropTypes.shape({
			uid: PropTypes.string
		}).isRequired
	}).isRequired,
	getListPrinter: PropTypes.func.isRequired,
	templates: PropTypes.shape({
		selectedPaper: PropTypes.number.isRequired,
		selectedTemplate: PropTypes.number.isRequired,
		templatesList: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired,
	clearAllCount: PropTypes.func.isRequired,
	clearCount: PropTypes.func.isRequired,
	setSearchString: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired,
	setNavGroup: PropTypes.func.isRequired,
	upNavGroup: PropTypes.func.isRequired,
	downNavGroup: PropTypes.func.isRequired,
	tableControl: PropTypes.shape({
		visible: PropTypes.bool.isRequired,
		column: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				show: PropTypes.bool.isRequired
			})
		)
	}).isRequired,
	controlVisible: PropTypes.func.isRequired,
	controlInvisible: PropTypes.func.isRequired,
	toggleColumn: PropTypes.func.isRequired,
	toggleVisible: PropTypes.func.isRequired,
	count: PropTypes.number.isRequired,
	deleteProduct: PropTypes.func.isRequired,
	setToken: PropTypes.func.isRequired,
	location: PropTypes.shape({
		search: PropTypes.string.isRequired
	}).isRequired,
	setToken: PropTypes.func.isRequired,
	sortProducts: PropTypes.func.isRequired,
	clearSort: PropTypes.func.isRequired,
	openPopUp: PropTypes.func.isRequired,
	quantityPopUp: PropTypes.shape({
		showQuantityPopUp: PropTypes.bool.isRequired
	}).isRequired,
	addToBuffer: PropTypes.func.isRequired,
	cancelCutProducts: PropTypes.func.isRequired,
	insertProduct: PropTypes.func.isRequired
}

Print = connect(
	state => ({
		printerSettings: state.printerSettings,
		products: state.products,
		token: state.user.token,
		markets: state.markets,
		templates: state.templates,
		status: state.products.status,
		tableControl: state.tableControl,
		visible: state.visible,
		elements: state.elements,
		count: state.formActions.count,
		statusForm: state.formActions.status,
		quantityPopUp: state.quantityPopUp
	}),
	dispatch =>
		bindActionCreators(
			{
				...actionsMarkets,
				...actionsProducts,
				...actionsPrinter,
				...tableControl,
				...formActions,
				...quantityPopUp,
				setToken
			},
			dispatch
		)
)(Print)

export default Print
