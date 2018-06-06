import React from 'react'
import ReactSelect from 'react-select'
import { hot } from 'react-hot-loader'
// import 'react-select/dist/react-select.css'
import styles from './index.scss'

function Select({ onChange, className, ...props }) {
	const handleOnChange = value => onChange(value)
	return (
		<ReactSelect
			name="form-field-name"
			className={`${styles['maxwell-select']} ${className}`}
			value="Не выбрано"
			placeholder="Выбрать"
			options={[]}
			onChange={handleOnChange}
			{...props}
		/>
	)
}

export default hot(module)(Select)
