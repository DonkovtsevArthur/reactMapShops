const defaultState = {
	visible: false,
	column: [
		{
			id: 'check',
			show: true,
			name: ''
		},
		{
			id: 'icon',
			show: true,
			name: ''
		},
		{
			id: 'name',
			show: true,
			name: 'Наименование',
			icon: true
		},
		{
			id: 'code',
			show: true,
			name: 'Код',
			icon: true
		},
		{
			id: 'article',
			show: true,
			name: 'Артикул',
			icon: true
		},
		{
			id: 'price',
			show: true,
			name: 'Цена',
			icon: true
		},
		{
			id: 'measure',
			show: true,
			name: 'Ед. изм.',
			title: 'Единицы измерения',
			icon: true
		},
		{
			id: 'quantity',
			show: true,
			name: 'Остаток',
			icon: true
		},
		{
			id: 'costPrice',
			show: false,
			name: 'Цена закупки',
			icon: true
		},
		{
			id: 'allowToSell',
			show: false,
			name: 'Продажа разрешена',
			icon: true
		},
		{
			id: 'barCodes',
			show: false,
			name: 'ШК',
			title: 'Штрих-код',
			icon: true
		},
		{
			id: 'controlHead',
			show: true,
			name: ''
		}
	]
}

function tableControl(state = defaultState, action) {
	switch (action.type) {
		case 'CONTROL_VISIBLE':
			return { ...state, visible: true }
		case 'CONTROL_INVISIBLE':
			return { ...state, visible: false }
		case 'TOGGLE_VISIBLE':
			return { ...state, visible: !state.visible }
		case 'TOGGLE_COLUMN':
			return {
				...state,
				column: state.column.map(item => {
					if (item.id === action.id) {
						return { ...item, show: !item.show }
					}
					return item
				})
			}
		default:
			return state
	}
}

export default tableControl
