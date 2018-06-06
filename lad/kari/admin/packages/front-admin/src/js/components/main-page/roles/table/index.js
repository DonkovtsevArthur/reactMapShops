import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import { documentsFromShop } from '~store/documents/selectors'
import styles from './index.scss'
import get from 'lodash/get'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./popup'))

function RolesTable({ data }) {
	const columns = [
		{ label: '№', styleName: styles['number-column'], field: '' },
		{
			label: 'Название',
			styleName: styles['name-column'],
			fieldFormat: ({ name }) => name
		},
		{
			label: 'Правила',
			styleName: styles['rules-column'],
			fieldFormat: ({ rules }) => rules.map(({ rule }) => get(rule, 'name', '')).join(', ')
		}
	]

	return (
		<Table
			{...{
				data,
				columns,
				TablePopup,
				styleName: styles['roles-table']
			}}
		/>
	)
}

export default hot(module)(RolesTable)
