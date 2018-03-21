const defaultState = {
	token: global.window.token || ''
}

function user(state = defaultState, action) {
	switch (action.type) {
		case 'SET_TOKEN':
			return { ...state, token: action.token }
		default:
			return state
	}
}

export default user

// bfa287ca-fc7b-4a20-85e9-98351231cce5
