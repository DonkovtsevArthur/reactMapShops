import React from 'react'
import PropTypes from 'prop-types'

const SelectProductName = ({ products, selectElement }) => (
	<div className="search__panel">
		{products.map(product => (
			<button
				key={product}
				value={product}
				className="search__item"
				onClick={e => selectElement(e)}
			>
				{product}
			</button>
		))}
	</div>
)

SelectProductName.propTypes = {
	products: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectElement: PropTypes.func.isRequired
}

export default SelectProductName
