import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { PROMOTION_GET, PROMOTION_CREATE, PROMOTION_DELETE, PROMOTION_UPDATE } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	data: {},
	list: []
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		// case PROMOTION_GET + REQUEST: {
		// return {
		// ...state
		// 		intoShops: {
		// 			...state.intoShops,
		// 			[storeId]: {
		// 				...state.intoShops[storeId],
		// 				loadingItems: true
		// 			}
		// 		}
		// }
		// }

		case PROMOTION_GET + SUCCESS: {
			const { data, list } = normalizeEntity({ data: payload.promotions, key: 'promotionId' })
			return { ...state, data: { ...state.data, ...data }, list }
		}

		case PROMOTION_CREATE + SUCCESS: {
			const promotionId = payload
			return {
				...state,
				data: {
					...state.data,
					[promotionId]: other.promotion
				},
				list: [...state.list, promotionId]
			}
		}

		case PROMOTION_DELETE + SUCCESS: {
			return { ...state, list: removeElement({ arr: state.list, value: other.promotionId }) }
		}

		default: {
			return state
		}
	}
}
