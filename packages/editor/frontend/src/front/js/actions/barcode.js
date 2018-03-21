import agent from 'superagent'
import pino from 'pino'
import SEARCH_URL from '../constants'

const logger = pino()

export function getProductsName(token, barcode) {
	return dispatch => {
		dispatch({
			type: 'REQUEST_PRODUCT_NAME'
		})
		agent
			.get(`${SEARCH_URL}/${barcode}`)
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.then(request => {
				dispatch({
					type: 'SUCCESS_PRODUCT_NAME',
					products: request.body
				})
			})
			.catch(error => {
				dispatch({
					type: 'ERROR_PRODUCT_NAME',
					message: error.message
				})
			})
	}
}

export function changeBarcode(barcode) {
	return dispatch => {
		dispatch({
			type: 'CHANGE_BARCODE',
			barcode
		})
	}
}

export function changeBarcodeAlco(barcodeAlco) {
	return dispatch => {
		dispatch({
			type: 'CHANGE_BARCODE_ALCO',
			barcodeAlco
		})
	}
}

export function setProductName(name) {
	return dispatch => {
		dispatch({
			type: 'SET_PRODUCT_NAME',
			name
		})
	}
}

export function setTimeout(findTimeout) {
	return dispatch => {
		dispatch({
			type: 'SET_TIMEOUT',
			findTimeout
		})
	}
}

export function showProductsName() {
	return dispatch => {
		dispatch({
			type: 'PRODUCT_NAME_VISIBLE'
		})
	}
}

export function hideProductsName() {
	return dispatch => {
		dispatch({
			type: 'PRODUCT_NAME_INVISIBLE'
		})
	}
}

export function showAlcoProductsName() {
	return dispatch => {
		dispatch({
			type: 'PRODUCT_NAME_ALCO_VISIBLE'
		})
	}
}

export function hideAlcoProductsName() {
	return dispatch => {
		dispatch({
			type: 'PRODUCT_NAME_ALCO_INVISIBLE'
		})
	}
}

export function clearTimeout() {
	return dispatch => {
		dispatch({
			type: 'CLEAR_TIMEOUT'
		})
	}
}

export function clearProductName() {
	return dispatch => {
		dispatch({
			type: 'CLEAR_PRODUCT_NAME'
		})
	}
}
