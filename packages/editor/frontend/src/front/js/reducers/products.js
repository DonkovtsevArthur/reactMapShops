const defaultState = {
	status: '',
	message: '',
	productList: [],
	sorted: false,
	sorting: {},
	selectedAll: false,
	count: 0,
	activePosition: {
		product: 0,
		group: 0
	},
	searchString: '',
	navGroup: [],
	buffer: []
}

function products(state = defaultState, action) {
	let navGroup
	switch (action.type) {
		case 'REQUEST_PRODUCTS':
			return { ...state, status: 'load' }
		case 'LOAD_PRODUCTS_SUCCESS':
			return {
				...state,
				status: 'success',
				productList: action.productList,
				activePosition: {
					product: 0,
					group: 0
				}
			}
		case 'LOAD_PRODUCTS_ERROR':
			return { ...state, status: 'error', message: action.message }
		case 'TOGGLE_PRODUCT':
			return {
				...state,
				productList: [...state.productList].map(product => {
					if (product.uuid === action.product.uuid) {
						return {
							...product,
							active: !product.active,
							countPrint: !product.active ? 1 : 0
						}
					}
					return product
				}),
				activePosition: action.product.group
					? {
							product: state.activePosition.product,
							group: action.product.active
								? state.activePosition.group - 1
								: state.activePosition.group + 1
					  }
					: {
							group: state.activePosition.group,
							product: action.product.active
								? state.activePosition.product - 1
								: state.activePosition.product + 1
					  }
			}
		case 'TOGGLE_ALL':
			return {
				...state,
				productList: [...state.productList].map(product => ({
					...product,
					active: !product.active
				}))
			}
		case 'SELECT_ALL':
			return {
				...state,
				selectedAll: true,
				productList: [...state.productList].map(product => ({ ...product, active: true }))
			}
		case 'UNCHECK_ALL': {
			return {
				...state,
				selectedAll: false,
				productList: [...state.productList].map(product => ({ ...product, active: false })),
				activePosition: {
					product: 0,
					group: 0
				}
			}
		}
		case 'SET_COUNT_PRINT':
			return {
				...state,
				count:
					action.countPrint > state.productList.find(item => item.uuid === action.uuid).countPrint
						? state.count + 1
						: state.count - 1,
				productList: [...state.productList].map(product => {
					if (product.uuid === action.uuid) {
						return {
							...product,
							countPrint: action.countPrint,
							active: action.countPrint > 0
						}
					}
					return { ...product, countPrint: product.countPrint }
				})
			}
		case 'MOVE_COUNT_PRINT':
			return {
				...state,
				productList: [...state.productList].map(product => ({
					...product,
					countPrint: product.quantity > 0 ? product.quantity : product.countPrint
				}))
			}
		case 'SORT_PRODUCTS':
			return {
				...state,
				sorted: true,
				sorting: {
					name: action.name,
					direct: action.direct
				},
				productList: [...state.productList].sort((a, b) => {
					const name = action.name
					let nameA = typeof a[name] === 'string' ? a[name].toLowerCase() : a[name]
					let nameB = typeof b[name] === 'string' ? b[name].toLowerCase() : b[name]
					nameA = +nameA ? +nameA : nameA
					nameB = +nameB ? +nameB : nameB
					const bothGroup = a.group && b.group
					const bothNoGroup = !a.group && !b.group
					if (bothGroup || bothNoGroup) {
						if (nameA === nameB) return 0
						return action.direct
							? +(nameA < nameB) || +(nameA < nameB) - 1
							: +(nameA > nameB) || +(nameA > nameB) - 1
					}
					if (a.group && !b.group) {
						return -1
					}
					if (!a.group && b.group) {
						return 1
					}
					return 0
				})
			}
		case 'CLEAR_SORT':
			return {
				...state,
				sorted: false
			}
		case 'SET_PRODUCT_MESSAGE':
			return { ...state, message: action.message }
		case 'CLEAR_COUNT':
			return {
				...state,
				productList: [...state.productList].map(product => {
					if (product.uuid === action.uuid) {
						return {
							...product,
							countPrint: 0,
							active: action.countPrint > 0
						}
					}
					return { ...product, countPrint: product.countPrint }
				})
			}
		case 'CLEAR_ALL_COUNT':
			return {
				...state,
				count: 0,
				productList: [...state.productList].map(product => ({
					...product,
					countPrint: 0,
					active: action.countPrint > 0
				}))
			}
		case 'SET_SEARCH_STRING':
			return {
				...state,
				searchString: action.searchString
			}
		case 'SET_NAV_GROUP': {
			return {
				...state,
				navGroup: [...state.navGroup, action.navGroup]
			}
		}
		case 'UP_NAV_GROUP': {
			return {
				...state,
				navGroup: state.navGroup.slice(0, -1)
			}
		}
		case 'DOWN_NAV_GROUP':
			return {
				...state,
				navGroup: state.navGroup.slice(0, state.navGroup.indexOf(action.navGroup) + 1)
			}
		case 'CHANGE_MARKET':
			return {
				...state,
				navGroup: []
			}
		case 'SUCCESS_DELETE_PRODUCT':
			return {
				...state,
				activePosition: {
					product: 0,
					group: 0
				}
			}
		case 'ADD_PRODUCTS_TO_BUFFER':
			return {
				...state,
				productList: action.productList,
				buffer: action.buffer,
				activePosition: {
					product: 0,
					group: 0
				}
			}
		case 'CANCEL_CUT_PRODUCTS':
			return {
				...state,
				productList: action.productList,
				buffer: []
			}
		case 'CLEAR_BUFFER':
			return {
				...state,
				buffer: []
			}
		default:
			return state
	}
}

export default products
