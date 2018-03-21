import React from 'react'
import PropTypes from 'prop-types'

const SliderInput = ({ input: { value, onChange } }) => (
	<label htmlFor="switcher" className="switch">
		<input type="checkbox" value={value} checked={value} onChange={onChange} id="switcher" />
		<div className="slider" />
	</label>
)

SliderInput.propTypes = {
	input: PropTypes.shape({
		value: PropTypes.bool,
		onChange: PropTypes.func.isRequired
	}).isRequired
}

SliderInput.defaultProps = {
	value: false
}

export default SliderInput
