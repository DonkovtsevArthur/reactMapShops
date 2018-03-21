import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pushProduct } from '../actions/formActions'
import * as clearQuantity from '../actions/clearQuantity'

// components
import PopUpClearQuantity from '../components/PopUpClearQuantity'

class Container extends Component {
	constructor() {
		super()
		this.getPopUp = this.getPopUp.bind(this)
		this.confirm = this.confirm.bind(this)
	}

	getPopUp() {
		if (this.props.marketList.length > 0 && this.props.market) {
			const marketName = this.props.marketList.filter(store => store.uuid === this.props.market)[0]
				.name
			if (this.props.showClearPopUp) {
				return (
					<PopUpClearQuantity
						close={this.props.closePopUp}
						market={marketName}
						confirm={this.confirm}
					/>
				)
			}
			return null
		}
		return null
	}

	confirm() {
		const filteredProduct = this.props.productList.filter(item => item.quantity < 0)
		const clearProduct = filteredProduct.map(item => ({ ...item, quantity: 0 }))
		this.props.pushProduct(this.props.token, this.props.market, clearProduct, '')
		this.props.closePopUp()
	}

	render() {
		return <div>{this.getPopUp()}</div>
	}
}

Container.propTypes = {
	productList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	marketList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	market: PropTypes.string,
	token: PropTypes.string.isRequired,
	pushProduct: PropTypes.func.isRequired,
	closePopUp: PropTypes.func.isRequired,
	showClearPopUp: PropTypes.bool.isRequired
}

Container.defaultProps = {
	market: ''
}

const ClearQuantity = connect(
	state => ({
		productList: state.products.productList,
		marketList: state.markets.marketList,
		market: state.markets.selected,
		token: state.user.token,
		showClearPopUp: state.clearQuantity.showClearPopUp
	}),
	dispatch => bindActionCreators({ ...clearQuantity, pushProduct }, dispatch)
)(Container)

export default ClearQuantity
