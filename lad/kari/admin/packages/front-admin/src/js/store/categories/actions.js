import { requestCreator } from '~utils/action-creators'
import { API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST } from '~constants'
import { CATEGORIES_GET, CATEGORY_CREATE, CATEGORY_DELETE } from './constants'

export function getCategories() {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: CATEGORIES_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_2}/goods/category/find`
		})
}

export function createCategory(category) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: CATEGORY_CREATE,
			requestUrl: `${API_URL_2}/goods/category/add`,
			requestType: POST_REQUEST,
			sendObject: [category],
			other: category
		})
}

export function deleteCategory({ _id }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: CATEGORY_DELETE,
			requestUrl: `${API_URL_2}/goods/category/remove`,
			requestType: DELETE_REQUEST,
			sendObject: { _id },
			other: { _id }
		})
}
