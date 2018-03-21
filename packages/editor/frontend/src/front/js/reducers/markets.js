const defaultState = {
	status: '',
	selected: '',
	message: '',
	storeBlockShow: false,
	marketList: []
}

function markets(state = defaultState, action) {
	switch (action.type) {
		case 'REQUEST_MARKET':
			return { ...state, status: 'load' }
		case 'LOAD_MARKET_SUCCESS':
			return {
				status: 'success',
				marketList: action.marketList,
				selected: action.marketList[0].uuid
			}
		case 'LOAD_MARKET_ERROR':
			return { ...state, status: 'error', message: action.message }
		case 'CHANGE_MARKET':
			return { ...state, selected: action.market }
		case 'SET_MESSAGE_MARKET':
			return { ...state, message: action.message }
		case 'STORE_BLOCK_SHOW':
			return { ...state, storeBlockShow: true }
		case 'STORE_BLOCK_HIDE':
			return { ...state, storeBlockShow: false }
		default:
			return state
	}
}

export default markets
