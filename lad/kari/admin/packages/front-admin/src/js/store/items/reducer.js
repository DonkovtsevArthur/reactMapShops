import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { ITEMS_GET_QUANTITY, ITEMS_GET, ITEM_GET } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	data: {},
	intoShops: {}
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case ITEMS_GET_QUANTITY + SUCCESS: {
			return { ...state, lastUpdate: payload.date, quantityItems: payload.res.count }
		}

		case ITEMS_GET + REQUEST: {
			const { storeId } = other
			return {
				...state,
				intoShops: {
					...state.intoShops,
					[storeId]: {
						...state.intoShops[storeId],
						loadingItems: true
					}
				}
			}
		}

		case ITEMS_GET + SUCCESS: {
			const { storeId } = other,
				{ count, items, limit, offset } = payload.res,
				{ data, list: normalizeList } = normalizeEntity({ data: items, key: 'barcode' })

			let list
			if (!state.intoShops[storeId].list) {
				list = normalizeList
				list.length = count
			} else {
				list = [
					...state.intoShops[storeId].list.slice(0, offset),
					...normalizeList,
					...state.intoShops[storeId].list.slice(offset + normalizeList.length, count)
				]
			}

			return {
				...state,
				data: { ...state.data, ...data },
				intoShops: {
					...state.intoShops,
					[storeId]: {
						...state.intoShops[storeId],
						loadingItems: false,
						quantityItems: count,
						list
					}
				}
			}
		}

		default: {
			return state
		}
	}
}
