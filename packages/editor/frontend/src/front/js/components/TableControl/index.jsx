import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class TableControl extends Component {
	constructor() {
		super()
		this.state = {
			childeHeight: 0,
			parentHeight: 0
		}
		this.resizeListener = this.resizeListener.bind(this)
		this.getControls = this.getControls.bind(this)
		this.getInfo = this.getInfo.bind(this)
		this.body = global.document.body
		this.document = global.document
	}
	componentDidMount() {
		const childeHeight = this.document.getElementById(this.props.parrent).clientHeight
		const parentHeight = global.window.innerHeight
		this.setState({
			childeHeight,
			parentHeight
		})
		global.window.addEventListener('resize', this.resizeListener, false)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.status === 'success') {
			const childeHeight = this.document.getElementById(this.props.parrent).clientHeight
			const parentHeight = global.window.innerHeight
			this.setState({
				childeHeight,
				parentHeight
			})
		}
	}

	componentWillUnmount() {
		global.window.removeEventListener('resize', this.resizeListener, false)
	}

	getInfo() {
		const selectedGroups = this.props.selectedGroup
		const selectedProducts = this.props.selectedProducts
		const totalGroups = this.props.elements.groups
		const totalProducts = this.props.elements.positions
		if (selectedGroups || selectedProducts) {
			return `Выделено: ${selectedGroups} из ${totalGroups} групп, ${selectedProducts} из ${totalProducts} позиций`
		}
		return `Всего: Групп ${totalGroups} Позиций ${totalProducts}`
	}

	getControls() {
		const selectedGroups = this.props.selectedGroup
		const selectedProducts = this.props.selectedProducts
		const buffer = this.props.products.buffer
		const bufferNotEmpty = buffer.length > 0
		const selected = selectedGroups || selectedProducts
		const controlls = []
		if (selected && !bufferNotEmpty) {
			controlls.push(
				<button
					className="btn btn__addgroup"
					onClick={() => this.props.addToBuffer(this.props.products.productList)}
					key="button-сut"
				>
					<i className="fa fa-cut controll__icon" /> Вырезать
				</button>
			)
		}
		if (bufferNotEmpty) {
			controlls.push(
				<button
					className="btn btn__addposition"
					onClick={this.props.insertProduct}
					key="button-paste"
				>
					<i className="fa fa-paste controll__icon" /> Вставить
				</button>
			)
			controlls.push(
				<button
					className="btn btn__addgroup"
					onClick={() =>
						this.props.cancelCutProducts(
							this.props.products.buffer,
							this.props.products.productList
						)
					}
					key="button-cancel"
				>
					<i className="fa fa-close controll__icon" /> Отмена вырезания
				</button>
			)
		}
		if (selected) {
			controlls.push(
				<button
					className="btn btn__delete"
					onClick={e => this.props.deleteProducts(e)}
					key="button-delete"
				>
					<img src="../img/basket.svg" alt="Удалить" className="img__delete" /> Удалить выбранное
				</button>
			)
		}
		return controlls
	}

	resizeListener() {
		const childeHeight = this.document.getElementById(this.props.parrent).clientHeight
		const parentHeight = global.window.innerHeight
		this.setState({
			childeHeight,
			parentHeight
		})
	}

	render() {
		const childeHeight = this.state.childeHeight
		const parentHeight = this.state.parentHeight
		const childeBigParent = childeHeight > parentHeight
		return (
			<div>
				<div className="tableControlPlace" />
				<div className={childeBigParent ? 'tableControlFixed' : 'tableControlAbsolute'}>
					<div className="tableControl__group tableControl__group_left tableControl__info">
						{this.getInfo()}
					</div>
					<div className="tableControl__group tableControl__group_right">{this.getControls()}</div>
				</div>
			</div>
		)
	}
}

TableControl.propTypes = {
	parrent: PropTypes.string.isRequired,
	elements: PropTypes.shape({
		groups: PropTypes.number.isRequired,
		positions: PropTypes.number.isRequired
	}).isRequired,
	selectedProducts: PropTypes.number.isRequired,
	selectedGroup: PropTypes.number.isRequired,
	deleteProducts: PropTypes.func.isRequired,
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
		buffer: PropTypes.arrayOf(
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
	addToBuffer: PropTypes.func.isRequired,
	cancelCutProducts: PropTypes.func.isRequired,
	insertProduct: PropTypes.func.isRequired
}

export default TableControl
