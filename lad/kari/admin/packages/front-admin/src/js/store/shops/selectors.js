import { createSelector } from 'reselect'
import get from 'lodash/get'

const idShop = (state, props) => props.id
const shopsDataGetter = (state, props) => state.shops.data
export const shopsListGetter = (state, props) => state.shops.list
const isDefault = (state, props) => get(props, 'isDefault', false)

export const shopsToSelect = createSelector(shopsListGetter, shopsDataGetter, isDefault, (list, data, isDefault) => {
  const options = list.map(shopId => {
		const { name = '', param, _id } = data[shopId]
		const country = get(param, '[country]', ''),
		const city = get(param, '[city]', '')
		const geo = !!`${country}${city}`.length
			? ` (${country ? country : ''}${city ? (country ? `, ${city}` : city) : ''})`
			: ''

		return { value: _id, label: name }
  })
  return isDefault ? [{ value: 'ALL', label: 'Все' }, ...options] :  options
}  
)
