import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionsTemplates from '../actions/templates'
import Title from '../components/Title'
import Element from '../components/Element'
import Preview from '../components/Preview'

let Elements = ({ selectedPaper, selectedTemplate, templatesList, toggleElement }) => (
	<div>
		<Title title={'Элементы печати'} />
		<div className="elements__block elements__img">
			<Preview
				selectedPaper={selectedPaper}
				selectedTemplate={selectedTemplate}
				templatesList={templatesList}
			/>
		</div>
		<div className="elements__block">
			{templatesList[selectedPaper].templates[selectedTemplate].elements.map(item => (
				<Element {...item} key={item.id} toggleElement={toggleElement} />
			))}
		</div>
	</div>
)

Elements.propTypes = {
	selectedPaper: PropTypes.number.isRequired,
	selectedTemplate: PropTypes.number.isRequired,
	templatesList: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			active: PropTypes.bool.isRequired
		})
	).isRequired,
	toggleElement: PropTypes.func.isRequired
}

Elements = connect(
	state => ({
		selectedPaper: state.templates.selectedPaper,
		selectedTemplate: state.templates.selectedTemplate,
		templatesList: state.templates.templatesList
	}),
	dispatch => bindActionCreators(actionsTemplates, dispatch)
)(Elements)

export default Elements
