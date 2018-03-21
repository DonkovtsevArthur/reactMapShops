import React from 'react'
import PropTypes from 'prop-types'
import { convertInches } from '../../helperFunction'

const TemplatesPreview = ({ template, size, active }) => {
	const url = 'http://api.labelary.com/v1/printers/8dpmm/labels/'
	const sizeLabel = `${convertInches(size)}/0/`
	const tmp = `^xa${template}^xz`
	return (
		<div className={active ? 'template__slide_active' : 'template__slide_inactive'}>
			<img
				src={url + sizeLabel + tmp}
				alt=""
				className={active ? 'template__img_active' : 'template__img_inactive'}
			/>
		</div>
	)
}

TemplatesPreview.propTypes = {
	template: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired
}

export default TemplatesPreview
