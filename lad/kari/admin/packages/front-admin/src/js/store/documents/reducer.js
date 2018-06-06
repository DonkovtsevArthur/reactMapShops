import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import { DOCUMENTS_GET } from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	loadingDocuments: null,
	intoShops: {}
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case DOCUMENTS_GET + REQUEST: {
			return { ...state, loadingDocuments: true }
		}

		case DOCUMENTS_GET + SUCCESS: {
			const { storeId } = other
			const { data, list } = normalizeEntity({ data: { ...payload }, key: 'uuid' })
			// ...divideIntoShops({ data: payload })
			return {
				...state,
				loadingDocuments: false,
				data: { ...state.data, ...data },
				intoShops: {
					...state.intoShops,
					[storeId ? storeId : 'ALL']: list.reverse()
				}
			}
		}

		default: {
			return state
		}
	}
}

function divideIntoShops({ data }) {
	const res = {}
	data.forEach(({ storeUuid, uuid }) => {
		const storeId = typeof storeUuid !== 'undefined' ? storeUuid : 'NOT_BINDED'
		if (typeof res[storeId] === 'undefined') res[storeId] = []
		res[storeId].push(uuid)
	})
	return res
}
