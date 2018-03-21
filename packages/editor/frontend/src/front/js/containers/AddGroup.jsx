import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as formActions from '../actions/formActions'
import AddGroupForm from '../components/AddGroupForm'
import Title from '../components/Title'
import BreadcrumbsLight from '../components/BreadcrumbsLight'

class AddGroup extends Component {
	constructor() {
		super()
		this.saveAndMore = this.saveAndMore.bind(this)
		this.saveAndClose = this.saveAndClose.bind(this)
	}

	componentWillMount() {
		if (this.props.match.params.uuid) {
			const uuid = this.props.match.params.uuid
			const product = this.props.productList.filter(item => item.uuid === uuid)
			if (product[0]) {
				this.props.setFormValue(product[0])
			}
		}
	}

	componentWillUnmount() {
		this.props.setFormDefaultValue()
	}

	saveAndMore(e) {
		e.preventDefault()
		this.props.pushProduct(this.props.token, this.props.store, this.props.values, 'addGroup')
	}

	saveAndClose() {
		this.props.pushProduct(this.props.token, this.props.store, this.props.values, 'addGroup')
	}

	render() {
		return (
			<div>
				<BreadcrumbsLight
					stores={this.props.markets}
					navigation={this.props.nav}
					storeUuid={this.props.selectMarket}
					products={this.props.productList}
				/>
				<Title title={this.props.defaultValue.uuid ? 'Редактирование группы' : 'Добавить группу'} />
				<AddGroupForm
					handleClickAndMore={this.saveAndMore}
					handleClickAndClose={this.saveAndClose}
				/>
			</div>
		)
	}
}

AddGroup.propTypes = {
	token: PropTypes.string.isRequired,
	store: PropTypes.string.isRequired,
	values: PropTypes.shape({
		uuid: PropTypes.string
	}).isRequired,
	pushProduct: PropTypes.func.isRequired,
	setFormDefaultValue: PropTypes.func.isRequired,
	setFormValue: PropTypes.func.isRequired,
	productList: PropTypes.arrayOf(
		PropTypes.shape({
			uuid: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			uuid: PropTypes.string
		})
	}),
	markets: PropTypes.arrayOf(
		PropTypes.shape({
			uuid: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	nav: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectMarket: PropTypes.string.isRequired,
	defaultValue: PropTypes.shape({
		uuid: PropTypes.string
	}).isRequired
}

AddGroup.defaultProps = {
	match: {},
	values: {}
}

AddGroup = connect(
	state => ({
		values: state.form.addGroup ? state.form.addGroup.values : {},
		token: state.user.token,
		store: state.markets.selected,
		productList: state.products.productList,
		defaultValue: state.formActions.defaultValue,
		markets: state.markets.marketList,
		nav: state.products.navGroup,
		selectMarket: state.markets.selected
	}),
	dispatch => bindActionCreators(formActions, dispatch)
)(AddGroup)

export default AddGroup
