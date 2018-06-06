import { createSelector } from 'reselect'

const idGetter = (state, props) => props.id
const itemsDataGetter = (state, props) => state.items.data
export const itemsListGetter = (state, props) => state.items.list
export const itemSelectorFactory = () => createSelector(itemsDataGetter, idGetter, (items, id) => items[id])

const shopIdGetter = (state, props) => props.storeId
const itemsFromShopList = (state, props) => state.items.intoShops

export const itemsFromShopFactory = () =>
	createSelector(shopIdGetter, itemsFromShopList, itemsDataGetter, (storeId, lists, data) => {
		if (!lists[storeId] || !lists[storeId].list) return { data: {}, list: [], quantityItems: 0 }
		const itemsData = {},
			{ list, quantityItems, loadingItems } = lists[storeId]
		list.forEach(itemId => (itemsData[itemId] = data[itemId]))
		return { list, data: itemsData, quantityItems, loadingItems }
	})
