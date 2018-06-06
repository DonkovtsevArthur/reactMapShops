import React from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./popup'))

function AttrCatTable({ data }) {
	const columns = [
		{ label: '№', styleName: styles['number-column'], field: '' },
		{
			label: 'Название',
			styleName: styles['name-column'],
			fieldFormat: ({ name }) => name
		},
		{
			label: 'Привязанные атрибуты',
			styleName: styles['attr-column'],
			fieldFormat: ({ attrs }) => <ul>{attrs.map(attr => <li key={attr._id}>{attr.name}</li>)}</ul>
		}
	]
	return (
		<Table
			{...{
				data,
				columns,
				TablePopup,
				styleName: styles['attributes-categories-table']
			}}
		/>
	)
}

export default hot(module)(AttrCatTable)
