// import pino from 'pino';

// const logger = pino();

export function changePrinter(uid) {
	return dispatch => {
		dispatch({
			type: 'CHANGE_PRINTER',
			printer: uid
		})
	}
}

export function getListPrinter() {
	return dispatch => {
		dispatch({ type: 'REQUEST_LIST_PRINTER' })
		global.BrowserPrint.getDefaultDevice(
			'printer',
			printer => {
				if (printer != null && printer.connection !== undefined) {
					dispatch({ type: 'SET_DEFAULT_PRINTER', printer })
					dispatch({ type: 'SET_PRINTER_STATUS', status: 'success' })
					global.BrowserPrint.getLocalDevices(printers => {
						if (printers !== undefined && printers instanceof Array && printers.length !== 0) {
							dispatch({ type: 'GET_LIST_PRINTER', printers })
						} else {
							dispatch({ type: 'ADD_PRINTER_TO_PRINTERS', printer })
						}
					})
				} else {
					dispatch({ type: 'SET_MESSAGE', message: 'Принтеров не найдено' })
					dispatch({ type: 'SET_PRINTER_STATUS', status: 'error' })
				}
			},
			() => {
				dispatch({
					type: 'SET_MESSAGE',
					message: 'Zebra Web Printing!'
				})
				dispatch({ type: 'SET_PRINTER_STATUS', status: 'error_no_programm' })
			}
		)
	}
}

export function getPrinterStatus(printer) {
	return dispatch => {
		printer.sendThenRead('~HQES', text => {
			const isError = text.charAt(70)
			const media = text.charAt(88)
			const head = text.charAt(87)
			const pause = text.charAt(84)

			if (isError !== '0') {
				dispatch({
					type: 'SET_MESSAGE',
					message: 'Принтер готов к печати'
				})
				dispatch({
					type: 'SET_PRINTER_STATUS',
					status: 'success'
				})
				if (media === '1') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Кончилась бумага'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (media === '2') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Кончилась лента'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (media === '4') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Открыта крышка принтера'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (media === '8') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Ошибка резака'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (head === '1') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Перегрев печатающей головки'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (head === '2') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Перегрев мотора'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (head === '4') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Ошибка печатающей головки'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (head === '8') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Неправильно установлена печатающая головка'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'error'
					})
				}
				if (pause === '1') {
					dispatch({
						type: 'SET_MESSAGE',
						message: 'Принтер поставлен на паузу'
					})
					dispatch({
						type: 'SET_PRINTER_STATUS',
						status: 'warning'
					})
				}
			} else {
				dispatch({
					type: 'SET_MESSAGE',
					message: 'Принтер готов к печати'
				})
				dispatch({
					type: 'SET_PRINTER_STATUS',
					status: 'success'
				})
			}
		})
	}
}

function printLabels(printer, templateArr, total, dispatch) {
	const count = templateArr.length
	if (count) {
		dispatch({
			type: 'SET_MESSAGE',
			message: `Печать ${count} из ${total}`
		})
		dispatch({
			type: 'SET_PRINTER_STATUS',
			status: 'print'
		})
		printer.send(
			templateArr.shift(),
			() => {
				printLabels(printer, templateArr, total, dispatch)
			},
			() => {
				getPrinterStatus(printer)(dispatch)
			}
		)
	} else {
		getPrinterStatus(printer)(dispatch)
	}
}

export function print(printer, productList, templatesList, selectedTemplate, selectedPaper) {
	return dispatch => {
		const templateArr = []
		const template = templatesList[selectedPaper].templates[selectedTemplate]
		const elements = template.elements
		const selectedProducts = productList.filter(product => product.active && product.countPrint > 0)
		selectedProducts.forEach(item => {
			const selectedElements = elements.filter(element => element.active)
			const templateArray = selectedElements.map(selectedElement => {
				if (selectedElement.id === 'barCodes') {
					return selectedElement.getTemplate(item[selectedElement.id][0])
				}
				return selectedElement.getTemplate(item[selectedElement.id])
			})
			const itemBodyTmp = template.getMainTemplate(templateArray.join(''))
			for (let i = 0; i < item.countPrint; i += 1) {
				templateArr.push(itemBodyTmp)
			}
		})
		const total = templateArr.length
		printLabels(printer, templateArr, total, dispatch)
	}
}
