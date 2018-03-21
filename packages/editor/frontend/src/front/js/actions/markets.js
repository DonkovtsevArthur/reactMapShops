import agent from 'superagent'
import pino from 'pino'

const logger = pino()

export function loadMarkets(token) {
	return dispatch => {
		dispatch({
			type: 'REQUEST_MARKET'
		})
		dispatch({
			type: 'SET_MESSAGE_MARKET',
			message: 'Загрузка магазинов...'
		})
		agent
			.get('https://api.evotor.ru/api/v1/inventories/stores/search')
			.set('Content-Type', 'application/json')
			.set('x-authorization', token)
			.then(request => {
				const marketList = JSON.parse(request.text)
				dispatch({
					type: 'LOAD_MARKET_SUCCESS',
					marketList
				})
				dispatch({
					type: 'SET_MESSAGE_MARKET',
					message: 'Магазины загружены'
				})
				if (marketList.length > 0) {
					dispatch({
						type: 'CHANGE_MARKET',
						market: marketList[0].uuid
					})
				} else {
					dispatch({
						type: 'SET_MESSAGE_MARKET',
						message: 'У вас нет магазинов'
					})
				}
			})
			.catch(error => {
				dispatch({
					type: 'LOAD_MARKET_ERROR',
					message: 'Ошибка загрузки магазинов'
				})
				logger.info(error)
			})
	}
}

export function changeMarket(market) {
	return dispatch => dispatch({ type: 'CHANGE_MARKET', market })
}

export function showStoreBlock() {
	return dispatch => dispatch({ type: 'STORE_BLOCK_SHOW' })
}

export function hideStoreBlock() {
	return dispatch => dispatch({ type: 'STORE_BLOCK_HIDE' })
}
