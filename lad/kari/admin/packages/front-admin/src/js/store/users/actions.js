import { requestCreator } from '~utils/action-creators'
import { API_URL, API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST } from '~constants'
import { USERS_GET, USER_DELETE, USER_CREATE } from './constants'

export function getUsers() {
	return async (dispatch, getState) =>
		getState().users.loadingUsers !== false &&
		requestCreator(dispatch, {
			type: USERS_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_2}/users/grants`
		})
}

export function deleteUser({ userId }) {
	return dispatch =>
		requestCreator(dispatch, {
			type: USER_DELETE,
			requestUrl: `${API_URL_2}/user/${userId}/delete`,
			requestType: DELETE_REQUEST,
			other: { userId }
		})
}

export function createUser({ user }) {
	return dispatch =>
		requestCreator(dispatch, {
			type: USER_CREATE,
			requestUrl: `${API_URL_2}/user/register`,
			requestType: POST_REQUEST,
			sendObject: user,
			other: { user }
		})
}
