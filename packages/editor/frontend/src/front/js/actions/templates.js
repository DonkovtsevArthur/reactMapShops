export function changePaper(key) {
	return dispatch => {
		dispatch({
			type: 'ENABLE_PAPER_SIZE',
			id: key
		})
	}
}

export function changeTemplate(key) {
	return dispatch => {
		dispatch({
			type: 'ENABLE_TEMPLATE',
			id: key
		})
	}
}

export function toggleElement(idElement) {
	return dispatch => {
		dispatch({
			type: 'TOGGLE_ELEMENT',
			idElement
		})
	}
}
