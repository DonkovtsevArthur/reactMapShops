import { REQUEST, SUCCESS, ERROR, AUTH_BY_EVOTOR } from '../constants'

const initialState = {
	appType: '',
	token: '',
	org: {},
	user: {},
	authorizationInProgress: null,
	errorMessage: ''
}

export default (state = initialState, { type, payload, errorMessage }) => {
	switch (type) {
		case AUTH_BY_EVOTOR + REQUEST:
			return { ...state, authorizationInProgress: true }

		case AUTH_BY_EVOTOR + ERROR:
			return {
				...state,
				errorMessage,
				authorizationInProgress: false
			}

		case AUTH_BY_EVOTOR + SUCCESS: {
			const { appType, token, org, user } = payload
			return {
				...state,
				authorizationInProgress: false,
				appType,
				token,
				org,
				user
			}
		}

		default:
			return state
	}
}
