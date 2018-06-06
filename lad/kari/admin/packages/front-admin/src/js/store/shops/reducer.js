import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { SHOPS_GET, SHOP_GET, SHOP_CREATE, SHOP_DELETE } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	data: {},
	list: [],
	loadingShops: null
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case SHOPS_GET + REQUEST: {
			return { ...state, loadingShops: true }
		}

		case SHOPS_GET + SUCCESS: {
			let newState = {
				...state,
				loadingShops: false
			}

			if (Array.isArray(payload)) {
				newState = {
					...newState,
					...normalizeEntity({
						data: payload,
						entities: 'd',
						key: '_id'
					})
				}
			}

			return newState
		}

		case SHOPS_GET + FAIL: {
			return { ...state, loadingShops: null, error }
		}

		case SHOP_GET + SUCCESS: {
			const { _id } = payload
			return {
				...state,
				data: {
					...state.data,
					[_id]: payload
				},
				list: [...state.list, _id]
			}
		}

		case SHOP_CREATE + SUCCESS: {
			const _id = payload,
				{ shop } = other
			return {
				...state,
				data: {
					...state.data,
					[_id]: { ...shop, _id }
				},
				list: [...state.list, _id]
			}
		}

		case SHOP_DELETE + SUCCESS: {
			const { storeId } = other
			const { [storeId]: temp, ...data } = state.data
			return {
				...state,
				data,
				list: removeElement({ arr: state.list, value: storeId })
			}
		}

		default: {
			return state
		}
	}
}
