import { requestCreator } from '~utils/action-creators'
import { API_URL, API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST } from '~constants'
import { ITEMS_GET_QUANTITY, ITEMS_GET, ITEM_GET } from './constants'

export const getQuantityItems = () => getItems({ storeId, limit: 1, type: ITEMS_GET_QUANTITY })

export function getItems({ storeId, limit = 0, offset = 0, type = ITEMS_GET }) {
	return (dispatch, getState) =>
		// getState().items.loadingItems !== false &&
		requestCreator(dispatch, {
			type,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_2}/goods/${storeId}/getPosList`,
			sendObject: { limit, offset },
			other: { storeId }
		})
}

// export function getItem({ productId }) {
// 	return (dispatch, getState) =>
// 		// getState().items.loadingItems !== false &&
// 		requestCreator(dispatch, {
// 			type: ITEM_GET,
// 			requestType: GET_REQUEST,
// 			requestUrl: `${API_URL_2}/goods/find`,
// 			sendObject: { uuid: productId }
// 		})
// }
