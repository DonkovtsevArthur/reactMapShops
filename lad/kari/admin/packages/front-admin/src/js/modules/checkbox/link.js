import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

function CheckboxLink({ id, labelClass = '', labelText = '' }) {
	return (
		<label
			{...{
				className: `${styles['checkbox-label-link']} ${labelClass}`,
				htmlFor: id
			}}
		>
			{labelText}
		</label>
	)
}

export default hot(module)(CheckboxLink)
