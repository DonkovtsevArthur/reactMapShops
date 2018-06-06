import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { ROLES_GET, ROLE_CREATE, ROLE_DELETE, ROLE_UPDATE } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	loadingRoles: null,
	data: {},
	list: []
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case ROLES_GET + REQUEST: {
			return { ...state, loadingRoles: true }
		}

		case ROLES_GET + SUCCESS: {
			const { data, list } = normalizeEntity({ data: payload, key: 'roleId' })
			return {
				...state,
				loadingRoles: false,
				data: { ...state.data, ...data },
				list
			}
		}

		case ROLE_CREATE + SUCCESS: {
			const roleId = payload,
				{ role } = other
			return {
				...state,
				list: [...state.list, roleId],
				data: { ...state.data, [roleId]: role }
			}
		}

		case ROLE_DELETE + SUCCESS: {
			return { ...state, list: removeElement({ arr: state.list, value: other.roleId }) }
		}

		case ROLE_UPDATE + SUCCESS: {
			const { role } = other
			return {
				...state,
				data: {
					...state.data,
					[role.roleId]: {
						...state.data[role.roleId],
						...role
					}
				}
			}
		}

		default: {
			return state
		}
	}
}
