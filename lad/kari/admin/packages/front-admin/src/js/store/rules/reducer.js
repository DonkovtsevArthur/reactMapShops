import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { RULES_GET, RULE_CREATE, RULE_DELETE, RULE_UPDATE } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	loadingRules: null,
	data: {},
	list: []
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case RULES_GET + REQUEST: {
			return { ...state, loadingRules: true }
		}

		case RULES_GET + SUCCESS: {
			return {
				...state,
				loadingRules: false,
				...normalizeEntity({ data: payload, key: 'ruleId' })
			}
		}

		case RULE_CREATE + SUCCESS: {
			return {
				...state,
				data: {
					...state.data,
					[payload]: {
						...other,
						ruleId: payload
					}
				},
				list: [...state.list, payload]
			}
		}

		case RULE_UPDATE + SUCCESS: {
			const { ruleId } = other
			return {
				...state,
				data: {
					...state.data,
					[ruleId]: { ...state.data[ruleId], ...other }
				}
			}
		}

		case RULE_DELETE + SUCCESS: {
			const { ruleId } = other
			return {
				...state,
				list: removeElement({ arr: state.list, value: ruleId }),
				data: removeElement({ obj: state.data, keys: ruleId })
			}
		}

		default: {
			return state
		}
	}
}
