import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddBarcode extends Component {
	constructor() {
		super()

		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleChange(event) {
		this.setState({ value: event.target.value })
	}

	handleClick() {
		this.props.fields.push(this.state.value)
		this.setState({ value: '' })
	}

	render() {
		return (
			<div>
				<div className="addBarcode__control">
					<input
						type="text"
						className="addBarcode__input"
						value={this.state.value}
						onChange={this.handleChange}
					/>
					<button
						type="button"
						className="addBarcode__btn"
						onClick={() => {
							this.handleClick()
						}}
					>
						<i className="fa fa-plus" />
					</button>
				</div>
				<ul className="addBarcode__list">
					{this.props.fields.map((barcode, i, fields) => (
						<li key={i} className="addBarcode__item">
							{fields.get(i)}
							<button
								onClick={e => {
									e.preventDefault()
									this.props.fields.remove(i)
								}}
								className="addBarcode__remove"
							>
								<i className="fa fa-remove addBarcode__icon_remove" />
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

AddBarcode.propTypes = {
	fields: PropTypes.shape({
		map: PropTypes.func.isRequired,
		remove: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired
	}).isRequired
}

export default AddBarcode
