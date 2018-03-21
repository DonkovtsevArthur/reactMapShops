import { getDateLimit } from './date-helpers'

export function getSection(widget) {
	return widget.section ? `GROUP BY ${widget.section}` : ''
}

export function getSectionY(widget) {
	return widget.section ? `, ${widget.section} as y` : ''
}

export function getStoresQuery(widget) {
	const dateLimit = getDateLimit('dateDoc', widget)

	return `SELECT DISTINCT
            storeUuid, dictGetString('_${
							widget.dataSourceId
						}|storeUuid_', 'value', tuple(storeUuid)) as name
          FROM dataSource
          ${dateLimit}
          GROUP BY storeUuid`
}
