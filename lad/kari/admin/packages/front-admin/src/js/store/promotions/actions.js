import { requestCreator } from '~utils/action-creators'
import { API_URL_3, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, PUT_REQUEST } from '~constants'
import { PROMOTION_GET, PROMOTION_CREATE, PROMOTION_DELETE, PROMOTION_UPDATE } from './constants'

export function getPromotions({
	isLastPromotionsGoingFirst = true,
	promotionId = '',
	isEnabled = false,
	page = 1,
	size = 1 //<= 50
}) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: PROMOTION_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_3}/discounts/promotion`
			// sendObject: {promotionId}
		})
}

export function createPromotion(promotion) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: PROMOTION_CREATE,
			requestUrl: `${API_URL_3}/discounts/promotion`,
			requestType: POST_REQUEST,
			sendObject: promotion,
			other: { promotion }
		})
}

export function deletePromotion({ promotionId = '' }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: PROMOTION_DELETE,
			requestUrl: `${API_URL_3}/discounts/promotion`,
			requestType: DELETE_REQUEST,
			sendObject: { promotionId },
			other: { promotionId }
		})
}

export function updatePromotion({ promotion }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: PROMOTION_UPDATE,
			requestUrl: `${API_URL_3}/discounts/promotion`,
			requestType: PUT_REQUEST,
			sendObject: promotion,
			other: { promotion }
		})
}
