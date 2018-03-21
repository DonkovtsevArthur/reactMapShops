import { getDateLimitWithPrev } from './date-helpers'
import { productUuidGenerate } from './products-helpers'
import { getCounterRequest } from './counter'
import { getBarRequest } from './bar'
import { getPieRerquest } from './pie'

export const queryGenerator = ({ config, products, market = '', period }) => {
	const flag = typeof period === 'undefined' ? config.period : period
	const section = market ? `AND storeUuid = '${market}'` : ''
	const dateLimit = getDateLimitWithPrev({
		dateField: 'dateDoc',
		widgetConfig: config,
		period: flag
	})

	let selectedProducts = ''
	let modConf = config
	if (typeof products !== 'undefined') {
		const uuidArray = productUuidGenerate({ products })
		if (!Object.is(uuidArray, null)) {
			selectedProducts = `AND (${uuidArray.join(' OR ')})`
			if (config.index === 'closeResultSum') modConf = { ...modConf, index: 'taxResultSum' }
			if (config.index === 'documentUuid')
				modConf = { ...modConf, index: 'quantity', indexAction: 'sum' }
		} else if (products.navGroup.length) {
			selectedProducts = `AND (productUuid='')`
		}
	}

	const requestsParams = { config: modConf, dateLimit, section, selectedProducts, period: flag }

	switch (config.graph) {
		case 'bar':
		case 'line':
			return getBarRequest(requestsParams)
		case 'count':
			return getCounterRequest(requestsParams)
		case 'pie':
			return getPieRerquest(config, dateLimit, section)
		default:
			return null
	}
}
