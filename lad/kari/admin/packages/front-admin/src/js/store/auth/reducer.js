import { REQUEST, SUCCESS, FAIL, LOCAL_STORAGE_NAME } from '~constants'
import { AUTH_SET, AUTH_RESET } from './constants'
import { axiosInitialization } from '~utils/action-creators'

const initialState = {
	loadingToken: null,
	token: '',
	error: ''
}

export default (state = initialState, { type, payload = {} }) => {
	const { token, error } = payload

	switch (type) {
		case AUTH_SET + REQUEST: {
			return { ...state, loadingToken: true }
		}

		case AUTH_SET + SUCCESS: {
			axiosInitialization({ token })
			return { ...state, ...payload, loadingToken: false, error: '' }
		}

		case AUTH_SET + FAIL: {
			return { ...state, loadingToken: null, token: '', error }
		}

		default: {
			return state
		}
	}
}
