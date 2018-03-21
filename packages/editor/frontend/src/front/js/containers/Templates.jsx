import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { bindActionCreators } from 'redux'
import * as actionsTemplates from '../actions/templates'
import TemplatesPreview from '../components/TemplatesPreview'
import Title from '../components/Title'
import LeftNavButton from '../components/LeftNavButton'
import RightNavButton from '../components/RightNavButton'

const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 1,
	accessibility: true,
	prevArrow: <LeftNavButton />,
	nextArrow: <RightNavButton />
}

let Templates = ({ templates, format, changeTemplate }) => (
	<div className="slider__container">
		<Title title="Шаблон печати" />
		<div className="templates__list">
			<Slider {...sliderSettings}>
				{templates[format].templates.map(item => (
					<div
						className="templates__item"
						key={item.id}
						onClick={() => {
							changeTemplate(item.id)
						}}
					>
						<TemplatesPreview
							template={item.elements.map(element => element.getTemplate()).join('')}
							size={templates[format].name}
							active={item.active}
							id={item.id}
						/>
					</div>
				))}
			</Slider>
		</div>
	</div>
)

Templates.propTypes = {
	templates: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			active: PropTypes.bool.isRequired
		})
	).isRequired,
	format: PropTypes.number.isRequired,
	changeTemplate: PropTypes.func.isRequired
}

Templates = connect(
	state => ({
		templates: state.templates.templatesList,
		format: state.templates.selectedPaper
	}),
	dispatch => bindActionCreators(actionsTemplates, dispatch)
)(Templates)

export default Templates
