import React from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./popup'))

function CategoriesTable({ data }) {
	const columns = [
		{ label: '№', styleName: styles['number-column'], field: '' },
		{
			label: 'Название',
			styleName: styles['name-column'],
			fieldFormat: ({ name }) => name
		},
		{
			label: 'Описание',
			styleName: styles['desc-column'],
			fieldFormat: ({ description }) => description
		},
		{
			label: 'Родитель',
			styleName: styles['parent-column'],
			fieldFormat: ({ parent }) => (parent ? parent.name : '-')
		}
	]
	return (
		<Table
			{...{
				data,
				columns,
				TablePopup,
				styleName: styles['categories-table']
			}}
		/>
	)
}

export default hot(module)(CategoriesTable)
