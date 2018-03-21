import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import printerSettings from './printerSettings'
import templates from './templates'
import user from './user'
import markets from './markets'
import products from './products'
import tableControl from './tableControl'
import formActions from './formActions'
import formPlugin from './formPlugin'
import quantityPopUp from './quantityPopUp'
import clearQuantity from './clearQuantity'
import barcode from './barcode'
import menu from './menu'
import monitor from './monitor'
import auth from './auth'

const mainReducer = combineReducers({
	printerSettings,
	templates,
	user,
	markets,
	products,
	tableControl,
	formActions,
	quantityPopUp,
	clearQuantity,
	barcode,
	menu,
	monitor,
	auth,
	routing: routerReducer,
	form: formReducer.plugin(formPlugin)
})

export default mainReducer
