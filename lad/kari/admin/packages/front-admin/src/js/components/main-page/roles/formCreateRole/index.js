import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

const Input = loadable(() => import('~modules/input'))
const Select = loadable(() => import('~modules/select'))
const isDev = process.env.NODE_ENV === `development`

class RoleCreateForm extends Component {
	state = { name: '', rulesIds: [] }

	handleChange = ({ field, value }) => this.setState({ [field]: value })
	handleChangeRules = options => {
		this.setState({ rulesIds: options.map(({ value }) => value) })
	}
	handleSubmit = event => {
		event.preventDefault()

		this.props.handleSubmit({ ...this.state })
		event.target.querySelector(`[class*='${this.props.closeId}-close']`).click()
	}

	render() {
		const { closeId, rulesOptions } = this.props
		const nameHandle = ({ value }) => this.handleChange({ field: 'name', value })
		return (
			<form className={styles[closeId]} onSubmit={this.handleSubmit}>
				<label className={styles[`${closeId}-close`]} htmlFor={closeId} />
				<Input placeholder="Название роли" getValue={nameHandle} required />
				<Select
					className={styles['select']}
					value={this.state.rulesIds.length && rulesOptions.find(({ value }) => value === rulesOptions)}
					placeholder="Правила"
					options={rulesOptions}
					onChange={this.handleChangeRules}
					isMulti
				/>
				<button type="submit" className={`${styles['button']} ${styles[`${closeId}-button`]}`}>
					Создать
				</button>
			</form>
		)
	}
}

export default hot(module)(RoleCreateForm)
