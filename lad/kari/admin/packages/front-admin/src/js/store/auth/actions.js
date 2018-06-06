import { requestCreator } from '~utils/action-creators'
import { REQUEST, SUCCESS, FAIL, POST_REQUEST, API_URL_2 } from '~constants'
import { AUTH_SET, AUTH_RESET } from './constants'

export function setAuthorization({ phone = '', password = '' }) {
	return dispatch =>
		requestCreator(dispatch, {
			type: AUTH_SET,
			requestUrl: `${API_URL_2}/user/login`,
			requestType: POST_REQUEST,
			sendObject: { phone, password }
		})
}
