import React from 'react'
import PropTypes from 'prop-types'

const Element = ({ name, id, active, toggleElement }) => (
	<div className="elements__control">
		<input
			type="checkbox"
			id={id}
			checked={active}
			onChange={() => {
				toggleElement(id)
			}}
		/>
		<label htmlFor={id}>{name}</label>
	</div>
)

Element.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	toggleElement: PropTypes.func.isRequired
}

export default Element
