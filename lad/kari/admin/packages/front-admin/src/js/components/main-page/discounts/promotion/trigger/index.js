import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'

function PromotionTrigger() {
	return (
		<section className={styles['promotion-trigger']}>
			<h1>Триггер</h1>
		</section>
	)
}

export default hot(module)(PromotionTrigger)
