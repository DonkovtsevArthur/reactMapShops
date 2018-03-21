import { getSection, getSectionY } from './query-helpers'

export function getCounterRequest({ config, section, dateLimit, selectedProducts, period }) {
	return `SELECT
          toFloat32(floor(${config.indexAction}If(x, ${
		config.index === 'documentUuid' ? "x!=''" : 'x!=-1'
	}), 2)) as x,
          toFloat32(floor(${config.indexAction}If(x1, ${
		config.index === 'documentUuid' ? "x1!=''" : 'x1!=-1'
	}), 2)) as x1
          ${getSectionY(config)}
          FROM (
            SELECT DISTINCT
              documentUuid,
              (CASE WHEN ${dateLimit.actual} THEN ${config.index} ELSE ${
		config.index === 'documentUuid' ? "''" : -1
	} END) as x,
              (CASE WHEN ${dateLimit.prev} THEN ${config.index} ELSE ${
		config.index === 'documentUuid' ? "''" : -1
	} END) as x1
              ${config.section ? `, ${config.section}` : ''}
            FROM dataSource WHERE ${dateLimit.all} ${selectedProducts} ${section}) ${getSection(
		config
	)}
          `
}
