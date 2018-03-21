const defaultState = {
	showClearPopUp: false
}

function clearQuantity(state = defaultState, action) {
	switch (action.type) {
		case 'OPEN_CLEAR_POPUP':
			return {
				...state,
				showClearPopUp: true
			}
		case 'CLOSE_CLEAR_POPUP':
			return {
				...state,
				showClearPopUp: false
			}
		default:
			return state
	}
}

export default clearQuantity
