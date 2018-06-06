import { requestCreator } from '~utils/action-creators'
import { API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, PUT_REQUEST } from '~constants'
import {
	ATTRIBUTES_GET,
	ATTRIBUTE_CREATE,
	ATTRIBUTE_DELETE,
	ATTRIBUTES_CATEGORIES_GET,
	ATTRIBUTE_CATEGORY_CREATE,
	ATTRIBUTE_CATEGORY_DELETE,
	ATTRIBUTE_CATEGORY_BIND
} from './constants'

export function getAttributes() {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ATTRIBUTES_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_2}/goods/atributes/find`
		})
}

export function createAttribute(attribute) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ATTRIBUTE_CREATE,
			requestUrl: `${API_URL_2}/goods/atributes/add`,
			requestType: POST_REQUEST,
			sendObject: attribute,
			other: attribute
		})
}

export function deleteAttribute({ _id }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ATTRIBUTE_DELETE,
			requestUrl: `${API_URL_2}/goods/atributes/remove`,
			requestType: DELETE_REQUEST,
			sendObject: { _id },
			other: { _id }
		})
}

export function getAttributesCategories() {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ATTRIBUTES_CATEGORIES_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_2}/goods/atributes/category/find`
		})
}

export function createAttributeCategory(attrCat) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ATTRIBUTE_CATEGORY_CREATE,
			requestUrl: `${API_URL_2}/goods/atributes/category/add`,
			requestType: POST_REQUEST,
			sendObject: attrCat,
			other: attrCat
		})
}

export function deleteAttributeCategory({ _id }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ATTRIBUTE_CATEGORY_DELETE,
			requestUrl: `${API_URL_2}/goods/atributes/category/remove`,
			requestType: DELETE_REQUEST,
			sendObject: { _id },
			other: { _id }
		})
}

export function bindAttributeCategory({ attrs, uuidCategory, uuidsAtributes }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ATTRIBUTE_CATEGORY_BIND,
			requestUrl: `${API_URL_2}/goods/atributes/category/bind`,
			requestType: PUT_REQUEST,
			sendObject: { uuidCategory, uuidsAtributes },
			other: { uuidCategory, uuidsAtributes, attrs }
		})
}
