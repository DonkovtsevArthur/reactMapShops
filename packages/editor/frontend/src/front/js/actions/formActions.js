import agent from 'superagent'
import pino from 'pino'
import { initialize } from 'redux-form'
import { loadProducts } from './products'

const logger = pino()

export function pushProduct(token, store, product, form) {
	let productArr = product
	if (!Array.isArray(product)) {
		productArr = [product]
	}
	return dispatch => {
		dispatch({
			type: 'REQUEST_PUSH_PRODUCT'
		})
		agent
			.post(`https://api.evotor.ru/api/v1/inventories/stores/${store}/products`)
			.set('Content-Type', 'application/json')
			.set('x-authorization', token)
			.send(productArr)
			.then(() => {
				dispatch({
					type: 'SUCCESS_PUSH_PRODUCT'
				})
				dispatch(initialize(form))
			})
			.catch(error => {
				dispatch({
					type: 'ERROR_PUSH_PRODUCT',
					message: error.message
				})
				logger.info(error)
			})
	}
}

export function deleteProduct(token, store, product) {
	return dispatch => {
		dispatch({
			type: 'REQUEST_DELETE_PRODUCT'
		})
		agent
			.post(`https://api.evotor.ru/api/v1/inventories/stores/${store}/products/delete`)
			.set('Content-Type', 'application/json')
			.set('x-authorization', token)
			.send(product)
			.then(() => {
				dispatch({
					type: 'SUCCESS_DELETE_PRODUCT'
				})
				loadProducts(token, store)(dispatch)
			})
			.catch(error => {
				dispatch({
					type: 'ERROR_DELETE_PRODUCT',
					message: error.message
				})
				logger.info(error)
			})
	}
}

export function insertProduct() {
	return async (dispatch, getStore) => {
		const token = getStore().user.token
		const buffer = getStore().products.buffer
		const navGroup = getStore().products.navGroup
		const group = navGroup.length >= 1 ? navGroup[navGroup.length - 1] : null
		const store = getStore().markets.selected
		if (buffer.length > 0) {
			try {
				const createdProducts = buffer.map(product => ({ ...product, parentUuid: group }))
				await agent
					.post(`https://api.evotor.ru/api/v1/inventories/stores/${store}/products`)
					.set('Content-Type', 'application/json')
					.set('x-authorization', token)
					.send(createdProducts)
				loadProducts(token, store)(dispatch)
				dispatch({
					type: 'CLEAR_BUFFER'
				})
			} catch (error) {
				logger.error('Невозможно удалить позиции', error)
			}
		}
	}
}

export function addToBuffer(products) {
	const buffer = []
	const productList = []
	products.forEach(product => {
		if (product.active) {
			buffer.push(product)
		} else {
			productList.push(product)
		}
	})
	return {
		type: 'ADD_PRODUCTS_TO_BUFFER',
		buffer,
		productList
	}
}

export function cancelCutProducts(buffer, products) {
	const unchecked = buffer.map(item => ({ ...item, active: false }))
	const productList = [...products, ...unchecked]
	return {
		type: 'CANCEL_CUT_PRODUCTS',
		productList
	}
}

export function clearCount() {
	return dispatch => {
		dispatch({
			type: 'CLEAR_COUNT'
		})
	}
}

export function setFormValue(value) {
	return dispatch => {
		dispatch({
			type: 'SET_FORM_VALUE',
			value
		})
	}
}

export function setFormDefaultValue() {
	return dispatch => {
		dispatch({
			type: 'SET_FORM_DEFAULT_VALUE'
		})
	}
}

export function changeFormValue(inputName, inputValue) {
	const values = {}
	values[inputName] = inputValue
	return dispatch => {
		dispatch({
			type: 'CHANGE_VALUE',
			values
		})
	}
}
