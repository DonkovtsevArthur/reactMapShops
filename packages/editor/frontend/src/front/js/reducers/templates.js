import tmp from '../../../constants'

const defaultState = {
	selectedPaper: 0,
	selectedTemplate: 0,
	saved: true,
	templatesList: tmp
}

function templates(state = defaultState, action) {
	switch (action.type) {
		case 'ENABLE_PAPER_SIZE':
			return {
				...state,
				selectedPaper: action.id,
				templatesList: state.templatesList.map((item, i) => {
					if (action.id === i) {
						const newItem = { ...item, active: true }
						return newItem
					}
					const newItem = { ...item, active: false }
					return newItem
				})
			}

		case 'ENABLE_TEMPLATE':
			return {
				...state,
				selectedTemplate: action.id,
				templatesList: state.templatesList.map((item, i) => {
					if (i === state.selectedPaper) {
						return {
							...item,
							templates: item.templates.map(template => {
								if (template.id === action.id) {
									return { ...template, active: true }
								}
								return { ...template, active: false }
							})
						}
					}
					return item
				})
			}

		case 'TOGGLE_ELEMENT':
			return {
				...state,
				templatesList: state.templatesList.map((item, i) => {
					if (i === state.selectedPaper) {
						return {
							...item,
							templates: item.templates.map((template, id) => {
								if (state.selectedTemplate === id) {
									return {
										...template,
										elements: template.elements.map(element => {
											if (element.id === action.idElement) {
												return { ...element, active: !element.active }
											}
											return element
										})
									}
								}
								return template
							})
						}
					}
					return item
				})
			}

		default:
			return state
	}
}

export default templates
