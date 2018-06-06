import { createSelector } from 'reselect'
import get from 'lodash/get'

// const idShop = (state, props) => props.id
export const rulesDataGetter = (state, props) => state.rules.data
export const rulesListGetter = (state, props) => state.rules.list

export const rulesToSelect = createSelector(rulesListGetter, rulesDataGetter, (list, data) =>
	list.map(ruleId => ({ value: data[ruleId].ruleId, label: data[ruleId].name }))
)
