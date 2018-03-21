const defaultState = {
	showQuantityPopUp: false,
	offsetValue: 0,
	value: 0,
	uuid: ''
}

function quantityPopUp(state = defaultState, action) {
	switch (action.type) {
		case 'OPEN_POPUP':
			return {
				...state,
				showQuantityPopUp: true,
				uuid: action.uuid
			}
		case 'CLOSE_POPUP':
			return {
				...state,
				showQuantityPopUp: false
			}
		case 'CLEAR_UUID':
			return {
				...state,
				uuid: ''
			}
		case 'CHANGE_QUANTITY_VALUE':
			return {
				...state,
				value: action.value,
				offsetValue: action.offsetValue
			}
		default:
			return state
	}
}

export default quantityPopUp
