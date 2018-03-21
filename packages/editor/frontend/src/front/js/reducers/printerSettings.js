import templates from '../../../constants'

const defaultState = {
	printers: [],
	papers: templates.map(template => ({ name: template.name, active: template.active })),
	message: '',
	printerStatus: '',
	intervalId: 0,
	selectedPrinter: {}
}

export default function printerSettings(state = defaultState, action) {
	switch (action.type) {
		case 'CHANGE_PRINTER':
			return {
				...state,
				selectedPrinter: state.printers.find(item => item.uid === action.printer)
			}
		case 'SET_DEFAULT_PRINTER':
			return {
				...state,
				selectedPrinter: action.printer
			}
		case 'REQUEST_LIST_PRINTER':
			return { ...state, printerStatus: 'load' }
		case 'GET_LIST_PRINTER':
			return { ...state, printers: action.printers }
		case 'ADD_PRINTER_TO_PRINTERS':
			const printers = [...state.printers]
			printers.push(action.printer)
			return {
				...state,
				printers
			}
		case 'SET_MESSAGE':
			return { ...state, message: action.message }
		case 'SET_PRINTER_STATUS':
			return { ...state, printerStatus: action.status }
		case 'SET_PULLING':
			return { ...state, intervalId: action.intervalId }
		case 'REMOVE_PULLING':
			return { ...state, intervalId: 0 }
		default:
			return state
	}
}
