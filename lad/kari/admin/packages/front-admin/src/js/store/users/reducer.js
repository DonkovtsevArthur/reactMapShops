import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { USERS_GET, USER_DELETE, USER_CREATE } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	loadingUsers: null
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case USERS_GET + REQUEST: {
			return { ...state, loadingUsers: true }
		}

		case USERS_GET + SUCCESS: {
			return { ...state, loadingUsers: false, ...normalizeEntity({ data: payload.users, key: 'userId' }) }
		}

		case USER_DELETE + SUCCESS: {
			const { userId } = other
			const { [userId]: temp, ...data } = state.data
			return {
				...state,
				data,
				list: removeElement({ arr: state.list, value: userId })
			}
		}

		case USER_CREATE + SUCCESS: {
			const _id = payload
			return {
				...state,
				data: {
					...state.data,
					[_id]: {
						...state.data[_id],
						meta: {
							...other.user
						},
						updated: Date.now()
					}
				},
				list: [...state.list, _id]
			}
		}

		default: {
			return state
		}
	}
}
