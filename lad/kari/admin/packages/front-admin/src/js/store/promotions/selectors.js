import { createSelector } from 'reselect'
import get from 'lodash/get'

const promotionIdGetter = (state, props) => props.promotionId
export const promotionsDataGetter = (state, props) => state.promotions.data
export const promotionsListGetter = (state, { sortBy }) => {
	if (sortBy) {
		const { list = [], data = {} } = state.promotions
		return [...list].sort((currentId, nextId) => {
			if (data[currentId][sortBy] > data[nextId][sortBy]) return 1
			if (data[currentId][sortBy] < data[nextId][sortBy]) return -1
			return 0
		})
	}
	return state.promotions.list
}

export const promotionFactory = () =>
	createSelector(promotionIdGetter, promotionsDataGetter, (promotionId, data) => data[promotionId])
