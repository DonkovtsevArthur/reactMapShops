import React from 'react'
import PropTypes from 'prop-types'
import { convertInches } from '../../helperFunction'

const Preview = ({ selectedPaper, selectedTemplate, templatesList }) => {
	const url = 'http://api.labelary.com/v1/printers/8dpmm/labels/'
	const paper = templatesList[selectedPaper]
	const size = paper.name
	const sizeLabel = `${convertInches(size)}/0/`
	const template = paper.templates[selectedTemplate]
	const activeElements = template.elements.filter(item => item.active)
	const zpl = activeElements.map(item => item.getTemplate())
	const tmp = `^xa${zpl.join('')}^xz`
	return <img src={url + sizeLabel + tmp} alt="" className="preview__img" />
}

Preview.propTypes = {
	selectedPaper: PropTypes.number.isRequired,
	selectedTemplate: PropTypes.number.isRequired,
	templatesList: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			active: PropTypes.bool.isRequired
		})
	).isRequired
}

export default Preview
