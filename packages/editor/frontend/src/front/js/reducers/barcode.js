const defaultState = {
	status: '',
	message: '',
	barcode: '',
	barcodeAlco: '',
	findTimeout: 0,
	show: false,
	showAlco: false,
	products: []
}

function barcode(state = defaultState, action) {
	switch (action.type) {
		case 'REQUEST_PRODUCT_NAME':
			return { ...state, status: 'request' }
		case 'SUCCESS_PRODUCT_NAME':
			return {
				...state,
				status: 'success',
				products: action.products,
				show: true
			}
		case 'CHANGE_BARCODE':
			return { ...state, barcode: action.barcode }
		case 'CHANGE_BARCODE_ALCO':
			return { ...state, barcodeAlco: action.barcodeAlco }
		case 'ERROR_PRODUCT_NAME':
			return { ...state, status: 'error', message: action.message }
		case 'SET_TIMEOUT':
			return { ...state, findTimeout: action.findTimeout }
		case 'CLEAR_TIMEOUT':
			return { ...state, findTimeout: '' }
		case 'CLEAR_PRODUCT_NAME':
			return { ...state, ...defaultState }
		case 'PRODUCT_NAME_VISIBLE':
			return { ...state, show: true }
		case 'PRODUCT_NAME_INVISIBLE':
			return { ...state, show: false }
		case 'PRODUCT_NAME_ALCO_VISIBLE':
			return { ...state, showAlco: true }
		case 'PRODUCT_NAME_ALCO_INVISIBLE':
			return { ...state, showAlco: false }
		default:
			return state
	}
}

export default barcode
