import { getDistinctXParam } from './query-helpers'

export function getPieRerquest(widget, dateLimit, section) {
	return `SELECT
            ${getDistinctXParam(widget)}, toFloat32(${widget.indexAction}(y)) as y
            FROM (SELECT DISTINCT documentUuid,
              ${widget.section} as x,
              ${widget.index} as y FROM dataSource WHERE ${dateLimit.actual} ${section})
            GROUP BY x
            ORDER BY y DESC
            LIMIT 10
          UNION ALL
          SELECT 'Остальные' as x, toFloat32(${widget.indexAction}(y)) as y
          FROM (SELECT DISTINCT documentUuid,
            ${widget.section} as x,
            ${widget.index} as y
            FROM dataSource WHERE ${dateLimit.actual} ${section} AND ${widget.section} NOT IN (
              SELECT x
              FROM (
                SELECT x, ${widget.indexAction}(y) as y
                FROM (
                  SELECT DISTINCT documentUuid, ${widget.section} as x, ${widget.index} as y
                  FROM dataSource WHERE ${dateLimit.actual} ${section})
                  GROUP BY x
                  ORDER BY y DESC LIMIT 10
                )
              )
            ) GROUP BY x`
}
