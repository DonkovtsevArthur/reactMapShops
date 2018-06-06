import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

const Input = loadable(() => import('~modules/input'))
const Select = loadable(() => import('~modules/select'))

class CategoryCreateForm extends Component {
	state = { name: '', description: '', parent: undefined }

	handleChange = ({ field, value }) => this.setState({ [field]: value })
	handleChangeParent = options =>
		this.handleChange({ field: 'parent', value: options !== null ? options.value : undefined })
	handleSubmit = event => {
		event.preventDefault()

		this.props.createCategory({ ...this.state })
		event.target.querySelector(`[class*='${this.props.closeId}-close']`).click()
	}

	render() {
		const { closeId, data } = this.props
		const nameHandle = ({ value }) => this.handleChange({ field: 'name', value })
		const descHandle = ({ value }) => this.handleChange({ field: 'description', value })
		const parents = data.list.map(item => ({ value: data.data[item]._id, label: data.data[item].name }))
		return (
			<form className={styles[closeId]} onSubmit={this.handleSubmit}>
				<label className={styles[`${closeId}-close`]} htmlFor={closeId} />
				<Input placeholder="Название" getValue={nameHandle} required />
				<Input placeholder="Описание" getValue={descHandle} required />
				<Select
					className={styles[`${closeId}-select`]}
					value={this.state.parent && parents.find(({ value }) => value === parents._id)}
					placeholder="Родительская категория"
					options={parents}
					onChange={this.handleChangeParent}
				/>
				<button type="submit" className={`${styles['button']} ${styles[`${closeId}-button`]}`}>
					Создать
				</button>
			</form>
		)
	}
}

export default hot(module)(CategoryCreateForm)
