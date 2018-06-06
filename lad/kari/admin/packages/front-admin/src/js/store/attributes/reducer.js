import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import {
	ATTRIBUTES_GET,
	ATTRIBUTE_CREATE,
	ATTRIBUTE_DELETE,
	ATTRIBUTES_CATEGORIES_GET,
	ATTRIBUTE_CATEGORY_CREATE,
	ATTRIBUTE_CATEGORY_DELETE,
	ATTRIBUTE_CATEGORY_BIND
} from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	loadingAttributes: null,
	loadingAttributesCategories: null,
	data: {},
	list: [],
	categories: {
		data: {},
		list: []
	}
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case ATTRIBUTES_GET + REQUEST: {
			return { ...state, loadingAttributes: true }
		}

		case ATTRIBUTES_GET + SUCCESS: {
			const { data, list } = normalizeEntity({ data: payload.res, key: '_id' })
			return {
				...state,
				loadingAttributes: false,
				data: { ...state.data, ...data },
				list
			}
		}

		case ATTRIBUTE_CREATE + SUCCESS: {
			return { ...state }
		}

		case ATTRIBUTE_DELETE + SUCCESS: {
			return { ...state, list: removeElement({ arr: state.list, value: other._id }) }
		}

		case ATTRIBUTES_CATEGORIES_GET + REQUEST: {
			return { ...state, loadingAttributesCategories: true }
		}

		case ATTRIBUTES_CATEGORIES_GET + SUCCESS: {
			const { data, list } = normalizeEntity({ data: payload.res, key: '_id' })
			return {
				...state,
				loadingAttributesCategories: false,
				categories: {
					...state.categories,
					data: { ...state.categories.data, ...data },
					list
				}
			}
		}

		case ATTRIBUTE_CATEGORY_CREATE + SUCCESS: {
			return { ...state }
		}

		case ATTRIBUTE_CATEGORY_DELETE + SUCCESS: {
			return {
				...state,
				categories: {
					...state.categories,
					list: removeElement({ arr: state.categories.list, value: other._id })
				}
			}
		}

		case ATTRIBUTE_CATEGORY_BIND + SUCCESS: {
			return {
				...state,
				categories: {
					...state.categories,
					data: {
						...state.categories.data,
						[other.uuidCategory]: {
							...state.categories.data[other.uuidCategory],
							attrs: other.attrs
						}
					}
				}
			}
		}

		default: {
			return state
		}
	}
}
