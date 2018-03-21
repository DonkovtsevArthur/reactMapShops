import React from 'react'
import PropTypes from 'prop-types'

const PaperSize = ({ changePaper, selectedPaper, papers }) => (
	<div className="paper__select">
		<span className="label">Размер этикетки:</span>
		<select
			onChange={e => changePaper(parseInt(e.target.value, 10))}
			className="settings__select_paper"
			defaultValue={selectedPaper}
		>
			{papers.map((paper, i) => (
				<option value={i} key={paper.name}>
					{`${paper.name} мм`}
				</option>
			))}
		</select>
	</div>
)

PaperSize.propTypes = {
	papers: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired
		})
	).isRequired,
	changePaper: PropTypes.func.isRequired,
	selectedPaper: PropTypes.number.isRequired
}

export default PaperSize
