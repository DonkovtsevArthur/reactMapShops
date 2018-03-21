import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ message }) => (
	<div className="message__error">
		<strong>{message}</strong>
	</div>
)

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired
}

export default ErrorMessage
