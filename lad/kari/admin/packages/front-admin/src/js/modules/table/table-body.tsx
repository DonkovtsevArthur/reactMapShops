import React from 'react'
import { hot } from 'react-hot-loader'
import TableLine from './tableLine'
import styles from './table-line.scss'

function TableBody({ data: { data, list }, page, pageSize, columns, TablePopup, ...rest }) {
	const getHeader = () => (
		<tr className={styles['tr']}>
			{columns.map(({ styleName, label }, index) => (
				<th key={`th-${index}`} className={`${styles['th']} ${styleName}`}>
					{label}
				</th>
			))}
		</tr>
	)

	const getBody = () => {
		const table = []
		for (let i = pageSize * (page - 1); i < page * pageSize && i < list.length; i++) {
			table.push(
				<TableLine
					{...{ lineIndex: i + 1, data: data[list[i]], columns, TablePopup, ...rest }}
					key={`line-${list[i]}`}
				/>
			)
		}
		return table
	}

	return (
		<tbody>
			{getHeader({ columns })}
			{getBody({ page, pageSize, columns })}
		</tbody>
	)
}

export default hot(module)(TableBody)
