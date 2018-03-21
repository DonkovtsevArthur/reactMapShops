import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BreadcrumbsLight extends Component {
	constructor() {
		super()
		this.getBreadcrumbs = this.getBreadcrumbs.bind(this)
	}
	getBreadcrumbs() {
		const store = this.props.stores.filter(item => item.uuid === this.props.storeUuid)[0].name
		if (this.props.navigation.length > 0) {
			const navigation = this.props.navigation
			const products = this.props.products
			const navigationProdcts = navigation.map(
				item => products.filter(product => product.uuid === item)[0].name
			)
			navigationProdcts.unshift(store)
			return navigationProdcts
		}
		return [store]
	}
	render() {
		return (
			<div className="breadcrumbsLight">
				{this.getBreadcrumbs().map((item, i) => {
					if (i === 0) {
						return <div key={i} className="breadcrumbsLight__item">{`${item}`}</div>
					}
					return (
						<div key={i} className="breadcrumbsLight__item">
							<div className="breadcrumbsLight__separator">/</div>
							<div>{item}</div>
						</div>
					)
				})}
			</div>
		)
	}
}

BreadcrumbsLight.propTypes = {
	stores: PropTypes.arrayOf(
		PropTypes.shape({
			uuid: PropTypes.string,
			name: PropTypes.string
		}).isRequired
	).isRequired,
	navigation: PropTypes.arrayOf(PropTypes.string).isRequired,
	storeUuid: PropTypes.string.isRequired,
	products: PropTypes.arrayOf(
		PropTypes.shape({
			uuid: PropTypes.string
		}).isRequired
	).isRequired
}

export default BreadcrumbsLight
