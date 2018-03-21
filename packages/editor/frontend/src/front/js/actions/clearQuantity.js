export function openPopUp() {
	return dispatch => {
		dispatch({
			type: 'OPEN_CLEAR_POPUP'
		})
	}
}

export function closePopUp() {
	return dispatch => {
		dispatch({
			type: 'CLOSE_CLEAR_POPUP'
		})
	}
}
