import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth/reducer'
import shops from './shops/reducer'
import items from './items/reducer'
import documents from './documents/reducer'
import users from './users/reducer'
import roles from './roles/reducer'
import rules from './rules/reducer'
import devices from './devices/reducer'
import promotions from './promotions/reducer'
import categories from './categories/reducer'
import attributes from './attributes/reducer'

export default combineReducers({
	auth,
	shops,
	items,
	documents,
	users,
	roles,
	rules,
	devices,
	promotions,
	categories,
	attributes,
	routing: routerReducer
})
