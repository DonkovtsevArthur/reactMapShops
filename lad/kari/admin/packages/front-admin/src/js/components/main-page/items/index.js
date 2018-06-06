import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

const ItemsTable = loadable(() => import('./table'))

function ItemsPage() {
	return (
		<section className={`${styles['page']} ${styles['goods-page']}`}>
			<h1>Товары</h1>
			<ItemsTable {...{ storeId: '41f4bafe-f292-43dc-a2e6-143ef7b575c6' }} />
		</section>
	)
}

export default hot(module)(ItemsPage)
