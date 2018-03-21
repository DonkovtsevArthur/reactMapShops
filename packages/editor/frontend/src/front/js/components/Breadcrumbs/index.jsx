import React from 'react'
import PropTypes from 'prop-types'

const Breadcrumbs = ({ names, downNavGroup }) => {
	const bread = names.map((item, i, array) => {
		if (i === array.length - 1) {
			return (
				<span className="bread__last" key={item.uuid}>
					{item.name}
				</span>
			)
		}
		return (
			<span key={item.uuid}>
				<a
					href=""
					onClick={e => {
						e.preventDefault()
						downNavGroup(item.uuid)
					}}
				>
					{item.name}
				</a>
				<span className="separate">/</span>
			</span>
		)
	})
	return <div className="bread">{bread}</div>
}

Breadcrumbs.propTypes = {
	names: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			uuid: PropTypes.string.isRequired
		})
	).isRequired,
	downNavGroup: PropTypes.func.isRequired
}

export default Breadcrumbs
