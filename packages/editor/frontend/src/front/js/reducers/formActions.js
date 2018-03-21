const defaultState = {
	status: '',
	message: '',
	count: 0,
	defaultValue: {
		uuid: '',
		code: '',
		barCodes: [],
		alcoCodes: [],
		name: '',
		price: '0.00',
		quantity: 0,
		costPrice: '0.00',
		measureName: 'шт',
		tax: 'NO_VAT',
		allowToSell: true,
		description: '',
		articleNumber: '',
		parentUuid: null,
		group: false,
		type: 'NORMAL',
		alcoholByVolume: 0,
		alcoholProductKindCode: 0,
		tareVolume: 0
	}
}

function formActions(state = defaultState, action) {
	switch (action.type) {
		case 'REQUEST_PUSH_PRODUCT':
			return { ...state, status: 'load', message: 'Сохранение...' }
		case 'REQUEST_DELETE_PRODUCT':
			return { ...state, status: 'load', message: 'Удаление...' }
		case 'SUCCESS_DELETE_PRODUCT':
			return { ...state, status: 'success', message: '' }
		case 'ERROR_DELETE_PRODUCT':
			return { ...state, status: 'error', message: action.message }
		case 'SUCCESS_PUSH_PRODUCT':
			return {
				...state,
				message: 'success',
				count: state.count + 1,
				defaultValue: defaultState.defaultValue
			}
		case 'SET_FORM_VALUE':
			return { ...state, defaultValue: action.value }
		case 'SET_FORM_DEFAULT_VALUE':
			return { ...state, defaultValue: defaultState.defaultValue }
		case 'CLEAR_COUNT':
			return { ...state, count: 0 }
		case 'ERROR_PUSH_PRODUCT':
			return { ...state, status: 'error', message: action.message }
		default:
			return state
	}
}

export default formActions
