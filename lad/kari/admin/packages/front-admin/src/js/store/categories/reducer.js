import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { CATEGORIES_GET, CATEGORY_CREATE, CATEGORY_DELETE } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	loadingCategories: null,
	data: {},
	list: []
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case CATEGORIES_GET + REQUEST: {
			return { ...state, loadingCategories: true }
		}

		case CATEGORIES_GET + SUCCESS: {
			const { data, list } = normalizeEntity({ data: payload.res, key: '_id' })
			return {
				...state,
				loadingCategories: false,
				data: { ...state.data, ...data },
				list
			}
		}

		case CATEGORY_CREATE + SUCCESS: {
			return { ...state }
		}

		case CATEGORY_DELETE + SUCCESS: {
			return { ...state, list: removeElement({ arr: state.list, value: other._id }) }
		}

		default: {
			return state
		}
	}
}
