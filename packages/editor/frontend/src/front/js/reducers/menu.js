const defaultState = {
	showFuncBlock: false
}

function menu(state = defaultState, action) {
	switch (action.type) {
		case 'FUNC_BLOCK_SHOW':
			return { ...state, showFuncBlock: true }
		case 'FUNC_BLOCK_HIDE':
			return { ...state, showFuncBlock: false }
		default:
			return state
	}
}

export default menu
