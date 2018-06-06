import React, { Component } from 'react'
import { patternPhone, patternInn, patternNumber, patternLetter, patternDate } from './patterns'
import { hot } from 'react-hot-loader'
import styles from './input.scss'

class Input extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value,
			className: ''
		}
	}

	render() {
		const { pattern, getValue, value: propValue = '', className: propsClass = '', ...props } = this.props
		const { value: stateValue, className: stateClass } = this.state

		return (
			<input
				{...props}
				value={stateValue}
				className={
					styles['maxwell-input'] +
					(propsClass.length ? ` ${propsClass}` : '') +
					(stateClass.length ? ` ${styles[stateClass]}` : '')
				}
				onChange={this.handleChange}
				onBlur={this.handleFocusOut}
			/>
		)
	}

	async componentDidMount() {
		if (typeof this.props.value !== 'undefined' && this.props.value.length) {
			await this.setState({ value: this.props.value })
			this.handleFocusOut()
		}
	}

	handleChange = event => {
		event.preventDefault()
		const { settings } = this.props
		const { value: currentValue } = this.state
		const currentLength = currentValue.length
		const { value } = event.currentTarget
		const length = value.length
		const lastSymbol = value.substring(value.length - 1)
		const params = { value, length, currentLength, lastSymbol }
		// const settings = JSON.parse(event.target.getAttribute("data-settings"));

		switch (settings) {
			case 'isPhone': {
				const data = patternPhone(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			case 'isInn': {
				const data = patternInn(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			case 'isNumbers': {
				const data = patternNumber(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			case 'isLetter': {
				const data = patternLetter(params)
				if (!Object.is(data, null)) this.setState({ value: data })
				return
			}

			// case 'isDate': {
			// 	const data = patternDate(params)
			// 	if (!Object.is(data, null)) this.setState({ value: data })
			// return
			// }

			default: {
				break
			}
		}
		this.setState({ value })
	}

	handleFocusOut = () => {
		const { value } = this.state
		const { getValue } = this.props
		const pattern = getPattern(this.props.settings, this.props.pattern)

		if (value === '') {
			this.setState({ className: 'empty' })
			if (typeof getValue === 'function') getValue({ value: '' })
			return
		}

		if (pattern) {
			if (value.toString().match(pattern)) {
				this.setState({ className: 'valid' })
				if (typeof getValue === 'function') getValue({ value })
			} else {
				this.setState({ className: 'invalid' })
				if (typeof getValue === 'function') getValue({ value: '' })
			}
			return
		}

		if (typeof getValue === 'function') getValue({ value })
		this.setState({ className: 'valid' })
	}
}

const getPattern = (settings, defaultPattern) => {
	switch (settings) {
		case 'isDate': {
			return '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]((19|20)\\d\\d)$'
		}
		default: {
			return defaultPattern
		}
	}
}

export default hot(module)(Input)
