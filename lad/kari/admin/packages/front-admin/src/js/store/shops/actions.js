import { requestCreator } from '~utils/action-creators'
import { API_URL, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, REQUEST, SUCCESS, CACHE } from '~constants'
import { SHOPS_GET, SHOP_GET, SHOP_CREATE, SHOP_DELETE } from './constants'

export function getShops({ isAdmin = false }) {
	return async (dispatch, getState) => {
		if (getState().shops.loadingShops === false) return

		if (isAdmin) {
			return requestCreator(dispatch, {
				type: SHOPS_GET,
				requestType: GET_REQUEST,
				requestUrl: '/stores'
			})
		} else {
			dispatch({ type: SHOPS_GET + REQUEST })
			const {
				auth: { stores }
			} = getState()
			await Promise.all(stores.map(storeId => getShop({ storeId, dispatch })))
			dispatch({ type: SHOPS_GET + SUCCESS })
		}
	}
}

export function getShop({ storeId, dispatch }) {
	const request = disp =>
		requestCreator(disp, {
			type: SHOP_GET,
			requestType: GET_REQUEST,
			requestUrl: '/stores',
			sendObject: { store: storeId }
		})
	return typeof dispatch !== 'undefined' ? request(dispatch) : disp => request(disp)
}

export function createShop({ shop }) {
	return dispatch =>
		requestCreator(dispatch, {
			type: SHOP_CREATE,
			requestUrl: '/stores',
			requestType: POST_REQUEST,
			sendObject: shop,
			other: { shop }
		})
}

export function deleteShop({ storeId }) {
	return dispatch =>
		requestCreator(dispatch, {
			type: SHOP_DELETE,
			requestUrl: `/stores/${storeId}`,
			requestType: DELETE_REQUEST,
			other: { storeId }
		})
}
