import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// actions
import * as barcodeActions from '../../actions/barcode'

// components
import SelectProductName from '../SelectProductName'

class Container extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.selectElement = this.selectElement.bind(this)
	}

	handleClick() {
		if (this.props.barcode) {
			this.props.fields.push(this.props.barcode)
			this.props.clearProductName()
		}
	}

	handleChange(e) {
		this.props.changeBarcode(e.target.value)
		clearTimeout(this.props.findTimeout)
		const findProduct = setTimeout(
			() => this.props.getProductsName('fe457bf2-3c82-4228-beb6-f3c06677e3da', this.props.barcode),
			300
		)
		this.props.setTimeout(findProduct)
	}

	selectElement(e) {
		e.preventDefault()
		this.handleClick()
		this.props.setProductName(e.target.value)
		this.props.clearProductName()
	}

	render() {
		return (
			<div>
				<div className="addBarcode__control">
					<input
						type="text"
						className="addBarcode__input"
						value={this.props.barcode}
						onChange={e => this.handleChange(e)}
						onBlur={() => setTimeout(() => this.props.hideProductsName(), 200)}
						onFocus={() => this.props.showProductsName()}
					/>
					<button
						type="button"
						className="addBarcode__btn"
						onClick={() => {
							this.handleClick()
						}}
					>
						<i className="fa fa-plus" />
					</button>
					{this.props.show && this.props.products && this.props.products.length > 0 ? (
						<SelectProductName {...this.props} selectElement={this.selectElement} />
					) : null}
				</div>
				<ul className="addBarcode__list">
					{this.props.fields.map((barcode, i, fields) => (
						<li key={i} className="addBarcode__item">
							{fields.get(i)}
							<button
								onClick={e => {
									e.preventDefault()
									this.props.fields.remove(i)
								}}
								className="addBarcode__remove"
							>
								<i className="fa fa-remove addBarcode__icon_remove" />
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

Container.propTypes = {
	fields: PropTypes.shape({
		map: PropTypes.func.isRequired,
		remove: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired
	}).isRequired,
	barcode: PropTypes.string.isRequired,
	changeBarcode: PropTypes.func.isRequired,
	clearProductName: PropTypes.func.isRequired,
	setTimeout: PropTypes.func.isRequired,
	findTimeout: PropTypes.number.isRequired,
	getProductsName: PropTypes.func.isRequired,
	products: PropTypes.arrayOf(PropTypes.string),
	setProductName: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	hideProductsName: PropTypes.func.isRequired,
	showProductsName: PropTypes.func.isRequired
}

Container.defaultProps = {
	products: []
}

const AddBarcode = connect(
	state => ({
		...state.barcode
	}),
	dispatch => bindActionCreators(barcodeActions, dispatch)
)(Container)

export default AddBarcode
