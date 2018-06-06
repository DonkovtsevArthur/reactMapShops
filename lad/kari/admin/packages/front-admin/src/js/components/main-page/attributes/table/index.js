import React from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./popup'))

function AttrTable({ data }) {
	const columns = [
		{ label: '№', styleName: styles['number-column'], field: '' },
		{
			label: 'Название',
			styleName: styles['name-column'],
			fieldFormat: ({ name }) => name
		}
	]
	return (
		<Table
			{...{
				data,
				columns,
				TablePopup,
				styleName: styles['attributes-table']
			}}
		/>
	)
}

export default hot(module)(AttrTable)
