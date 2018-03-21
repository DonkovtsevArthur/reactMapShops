import React from 'react'
import PropTypes from 'prop-types'

const RenderInput = ({ input, placeholder, type, meta: { touched, error } }) => (
	<div>
		<div>
			<input
				{...input}
				placeholder={placeholder}
				type={type}
				className={error && touched ? 'form__error_field' : ''}
			/>
			{touched && error && <span className="form__error_message">{error}</span>}
		</div>
	</div>
)

RenderInput.propTypes = {
	input: PropTypes.shape({}).isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	meta: PropTypes.shape({
		touched: PropTypes.bool.isRequired,
		error: PropTypes.string
	}).isRequired
}

export default RenderInput
