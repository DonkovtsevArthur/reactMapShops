export function openPopUp(uuid) {
	return dispatch => {
		dispatch({
			type: 'OPEN_POPUP',
			uuid
		})
	}
}

export function closePopUp() {
	return dispatch => {
		dispatch({
			type: 'CLOSE_POPUP'
		})
	}
}

export function clearUuid() {
	return dispatch => {
		dispatch({
			type: 'CLEAR_UUID'
		})
	}
}

export function changeValue(value, offsetValue) {
	return dispatch => {
		dispatch({
			type: 'CHANGE_QUANTITY_VALUE',
			value,
			offsetValue
		})
	}
}
