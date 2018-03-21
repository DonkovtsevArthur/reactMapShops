import React from 'react'
import PropTypes from 'prop-types'

const clearQuantityButton = ({ openPopUp }) => (
	<div className="clear__button">
		<button className="export__btn" title="Обнуление остатков" onClick={() => openPopUp()}>
			<i className="fa fa-refresh" />
		</button>
	</div>
)

clearQuantityButton.propTypes = {
	openPopUp: PropTypes.func.isRequired
}

export default clearQuantityButton
