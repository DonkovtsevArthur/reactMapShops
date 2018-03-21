const DATE_FIELD = 'dateDoc'

export function getBarRequest({ config, section, dateLimit, selectedProducts, period }) {
	return `SELECT
            ${getGroupParamForBar({ period, dateLimit, config }).result}
            FROM (SELECT
                    DISTINCT documentUuid,
                    ${getGroupParamForBar({ period, dateLimit, config }).group}
                    FROM dataSource WHERE ${dateLimit.all} ${selectedProducts} ${section})
            GROUP BY x`
}

function getGroupParamForBar({ period, dateLimit, config }) {
	switch (period) {
		case 'today':
		case 'yesterday':
			return {
				group: `(CASE WHEN ${
					dateLimit.all
				} THEN toHour(plus(${DATE_FIELD}, timeZone)) ELSE -1 END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y1`,
				result: `x, toFloat32(${config.indexAction || 'sum'}If(y, ${
					config.index === 'documentUuid' ? "y!=''" : 'y!=-1'
				})) as y, toFloat32(${config.indexAction || 'sum'}If(y1, ${
					config.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'
				})) as y1`
			}
		case '7days':
		case '30days':
			return {
				group: `(CASE WHEN ${
					dateLimit.actual
				} THEN toDate(plus(${DATE_FIELD}, timeZone)) ELSE toDate(plus(${DATE_FIELD}, plus(timeZone, ${
					dateLimit.duration
				}))) END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y1`,
				result: `x, toFloat32(${config.indexAction || 'sum'}If(y, ${
					config.index === 'documentUuid' ? "y!=''" : 'y!=-1'
				})) as y, toFloat32(${config.indexAction || 'sum'}If(y1, ${
					config.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'
				})) as y1`
			}
		case 'year':
			return {
				group: `(CASE WHEN ${
					dateLimit.actual
				} THEN arrayStringConcat([toString(toMonth(plus(${DATE_FIELD}, timeZone))), toString(toYear(plus(${DATE_FIELD}, timeZone)))], '.') ELSE arrayStringConcat([toString(toMonth(plus(${DATE_FIELD}, plus(${
					dateLimit.duration
				}, timeZone)))), toString(toYear(plus(${DATE_FIELD}, plus(${
					dateLimit.duration
				}, timeZone))))], '.') END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y1`,
				result: `x, toFloat32(${config.indexAction || 'sum'}If(y, ${
					config.index === 'documentUuid' ? "y!=''" : 'y!=-1'
				})) as y, toFloat32(${config.indexAction || 'sum'}If(y1, ${
					config.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'
				})) as y1`
			}
		default:
			return {
				group: `(CASE WHEN ${
					dateLimit.all
				} THEN toHour(plus(${DATE_FIELD}, timeZone)) ELSE -1 END ) as x,
              (CASE WHEN ${dateLimit.actual} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y,
              (CASE WHEN ${dateLimit.prev} THEN ${config.index} ELSE ${
					config.index === 'documentUuid' ? "''" : -1
				} END ) as y1`,
				result: `x, toFloat32(${config.indexAction || 'sum'}If(y, ${
					config.index === 'documentUuid' ? "y!=''" : 'y!=-1'
				})) as y, toFloat32(${config.indexAction || 'sum'}If(y1, ${
					config.index === 'documentUuid' ? "y1!=''" : 'y1!=-1'
				})) as y1`
			}
	}
}
