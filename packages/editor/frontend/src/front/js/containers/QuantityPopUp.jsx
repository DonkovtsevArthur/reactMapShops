import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// actions
import * as quantityPopUp from '../actions/quantityPopUp'
import * as formActions from '../actions/formActions'

// components
import PopUpQuantity from '../components/PopUpQuantity'

class QuantityPopUp extends Component {
	constructor() {
		super()
		this.changeQuantity = this.changeQuantity.bind(this)
	}

	componentWillMount() {
		if (this.props.uuid) {
			this.product = this.props.productList.filter(product => product.uuid === this.props.uuid)[0]
		}
		this.props.changeValue(this.product.quantity, 0)
	}

	componentWillUnmount() {
		this.props.clearUuid()
	}

	changeQuantity() {
		this.props.pushProduct(
			this.props.token,
			this.props.market,
			{ ...this.product, quantity: this.props.value },
			''
		)
		this.props.closePopUp()
	}

	render() {
		return (
			<div>
				<PopUpQuantity
					close={this.props.closePopUp}
					product={this.product}
					value={this.props.value}
					offsetValue={this.props.offsetValue}
					changeValue={this.props.changeValue}
					changeQuantity={this.changeQuantity}
				/>
			</div>
		)
	}
}

QuantityPopUp.propTypes = {
	uuid: PropTypes.string.isRequired,
	productList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	closePopUp: PropTypes.func.isRequired,
	clearUuid: PropTypes.func.isRequired,
	pushProduct: PropTypes.func.isRequired,
	changeValue: PropTypes.func.isRequired,

	value: PropTypes.number.isRequired,
	offsetValue: PropTypes.number.isRequired,
	token: PropTypes.string.isRequired,
	market: PropTypes.string.isRequired
}

QuantityPopUp = connect(
	state => ({
		...state.quantityPopUp,
		token: state.user.token,
		market: state.markets.selected,
		productList: state.products.productList
	}),
	dispatch => bindActionCreators({ ...quantityPopUp, ...formActions }, dispatch)
)(QuantityPopUp)

export default QuantityPopUp
