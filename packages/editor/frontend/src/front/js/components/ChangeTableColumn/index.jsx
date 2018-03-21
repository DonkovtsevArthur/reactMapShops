import React, { Component } from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'

class changeTableColumn extends Component {
	constructor() {
		super()
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}
	handleClickOutside() {
		this.props.controlInvisible()
	}
	render() {
		const checkboxList = this.props.columns.map(item => {
			if (item.name) {
				return (
					<div className="control__checkbox_group" key={item.id}>
						<input
							type="checkbox"
							defaultChecked={item.show}
							id={item.id}
							className="control__checkbox"
							onClick={e => this.props.toggleColumn(e.target.id)}
						/>
						<label htmlFor={item.id} className="control__label">
							<span className="control__label_column">{item.name}</span>
						</label>
					</div>
				)
			}
			return false
		})
		const controlCheckox = this.props.visible ? (
			<div className="control__block">{checkboxList}</div>
		) : null

		return (
			<div className="control__column">
				<button className="control__column_change" onClick={() => this.props.toggleVisible()}>
					<i className="fa fa-ellipsis-v control__ellipsis" />
				</button>
				{controlCheckox}
			</div>
		)
	}
}

changeTableColumn.propTypes = {
	visible: PropTypes.bool.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired
		})
	).isRequired,
	controlVisible: PropTypes.func.isRequired,
	controlInvisible: PropTypes.func.isRequired,
	toggleColumn: PropTypes.func.isRequired,
	toggleVisible: PropTypes.func.isRequired
}

export default onClickOutside(changeTableColumn)
