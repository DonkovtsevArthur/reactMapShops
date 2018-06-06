import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

const Input = loadable(() => import('~modules/input'))

class CatForm extends Component {
	state = { name: '' }

	handleChange = ({ field, value }) => this.setState({ [field]: value })
	handleSubmit = event => {
		event.preventDefault()

		this.props.createAttributeCategory({ ...this.state })
		event.target.querySelector(`[class*='${this.props.closeId}-close']`).click()
	}

	render() {
		const { closeId } = this.props
		const nameHandle = ({ value }) => this.handleChange({ field: 'name', value })
		return (
			<form className={styles[closeId]} onSubmit={this.handleSubmit}>
				<label className={styles[`${closeId}-close`]} htmlFor={closeId} />
				<Input placeholder="Название" getValue={nameHandle} required />
				<button type="submit" className={`${styles['button']} ${styles[`${closeId}-button`]}`}>
					Создать
				</button>
			</form>
		)
	}
}

export default hot(module)(CatForm)
