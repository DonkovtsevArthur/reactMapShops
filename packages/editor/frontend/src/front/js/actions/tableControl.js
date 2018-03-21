export function controlVisible() {
	return dispatch => dispatch({ type: 'CONTROL_VISIBLE' })
}

export function controlInvisible() {
	return dispatch => dispatch({ type: 'CONTROL_INVISIBLE' })
}

export function toggleColumn(id) {
	return dispatch => dispatch({ type: 'TOGGLE_COLUMN', id })
}

export function toggleVisible() {
	return dispatch => dispatch({ type: 'TOGGLE_VISIBLE' })
}
