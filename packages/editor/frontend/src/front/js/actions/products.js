import agent from 'superagent'

export function loadProducts(token, store) {
	return dispatch => {
		dispatch({
			type: 'REQUEST_PRODUCTS'
		})
		dispatch({
			type: 'SET_PRODUCT_MESSAGE',
			message: 'Загрузка номенклатуры...'
		})
		agent
			.get(`https://api.evotor.ru/api/v1/inventories/stores/${store}/products`)
			.set('Content-Type', 'application/json')
			.set('x-authorization', token)
			.then(request => {
				const list = JSON.parse(request.text)
				const productList = list.map(product => ({ ...product, active: false, countPrint: 0 }))
				dispatch({
					type: 'LOAD_PRODUCTS_SUCCESS',
					productList
				})
				dispatch({
					type: 'SET_PRODUCT_MESSAGE',
					message: 'Номенклатура загружена'
				})
				if (productList.length === 0) {
					dispatch({
						type: 'SET_PRODUCT_MESSAGE',
						message: 'У вас нет номенклатуры'
					})
				}
			})
			.catch(error => {
				if (error.status !== 404) {
					dispatch({
						type: 'LOAD_PRODUCTS_ERROR',
						message: 'Ошибка загрузки номенклатуры'
					})
				}
			})
	}
}

export function toggleProduct(product) {
	return dispatch => dispatch({ type: 'TOGGLE_PRODUCT', product })
}

export function toggleAll() {
	return dispatch => dispatch({ type: 'TOGGLE_ALL' })
}

export function selectAll() {
	return dispatch => dispatch({ type: 'SELECT_ALL' })
}

export function uncheckAll() {
	return dispatch => dispatch({ type: 'UNCHECK_ALL' })
}

export function moveCountPrint() {
	return dispatch => dispatch({ type: 'MOVE_COUNT_PRINT' })
}

export function clearAllCount() {
	return dispatch => dispatch({ type: 'CLEAR_ALL_COUNT' })
}

export function clearCount(uuid) {
	return dispatch => dispatch({ type: 'CLEAR_COUNT', uuid })
}

export function setSearchString(searchString) {
	return dispatch => dispatch({ type: 'SET_SEARCH_STRING', searchString })
}

export function setNavGroup(navGroup) {
	return dispatch => {
		uncheckAll()(dispatch)
		dispatch({ type: 'SET_NAV_GROUP', navGroup })
	}
}

export function upNavGroup() {
	return dispatch => {
		uncheckAll()(dispatch)
		dispatch({ type: 'UP_NAV_GROUP' })
	}
}

export function downNavGroup(navGroup) {
	return dispatch => {
		uncheckAll()(dispatch)
		dispatch({ type: 'DOWN_NAV_GROUP', navGroup })
	}
}

export function setCountPrint(value, uuid) {
	return dispatch =>
		dispatch({
			type: 'SET_COUNT_PRINT',
			countPrint: parseInt(value, 10),
			uuid
		})
}

export function sortProducts(name, direct) {
	return dispatch =>
		dispatch({
			type: 'SORT_PRODUCTS',
			name,
			direct
		})
}

export function clearSort() {
	return dispatch =>
		dispatch({
			type: 'CLEAR_SORT'
		})
}
