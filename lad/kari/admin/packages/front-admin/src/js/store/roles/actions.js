import { requestCreator } from '~utils/action-creators'
import { API_URL, API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, PUT_REQUEST, API_URL_2 } from '~constants'
import { ROLES_GET, ROLE_CREATE, ROLE_DELETE, ROLE_UPDATE } from './constants'

export function getRoles(/*{roleId, roleName}*/) {
	return (dispatch, getState) =>
		/* (!getState().documents.intoShops[store]) &&*/ requestCreator(dispatch, {
			type: ROLES_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_2}/role`
		})
}

export function createRole(role) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ROLE_CREATE,
			requestUrl: `${API_URL_2}/role`,
			requestType: POST_REQUEST,
			sendObject: role,
			other: { role }
		})
}

export function updateRole(role) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ROLE_UPDATE,
			requestUrl: `${API_URL_2}/role`,
			requestType: PUT_REQUEST,
			sendObject: role,
			other: { role: { ...role, rules: role.rulesIds.map(ruleId => getState().rules.data[ruleId]) } }
		})
}

export function deleteRole({ roleId }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: ROLE_DELETE,
			requestUrl: `${API_URL_2}/role`,
			requestType: DELETE_REQUEST,
			sendObject: { roleId },
			other: { roleId }
		})
}
