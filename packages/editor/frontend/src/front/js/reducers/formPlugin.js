const formPlugin = {
	addPosition: (state, action) => {
		switch (action.type) {
			case 'CHANGE_VALUE':
				return {
					...state,
					values: {
						...state.values,
						...action.values
					}
				}
			case 'SET_PRODUCT_NAME':
				return {
					...state,
					values: {
						...state.values,
						name: action.name
					}
				}
			default:
				return state
		}
	}
}

export default formPlugin
