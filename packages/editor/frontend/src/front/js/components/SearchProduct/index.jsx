import React from 'react'
import PropTypes from 'prop-types'

const SearchProduct = ({ searchString, setSearchString }) => (
	<div className="search">
		<i className="fa  fa-search search__icon" />
		<input
			type="text"
			value={searchString}
			onChange={e => setSearchString(e.target.value)}
			className="search__input"
			id="search"
		/>
	</div>
)

SearchProduct.propTypes = {
	searchString: PropTypes.string.isRequired,
	setSearchString: PropTypes.func.isRequired
}

export default SearchProduct
