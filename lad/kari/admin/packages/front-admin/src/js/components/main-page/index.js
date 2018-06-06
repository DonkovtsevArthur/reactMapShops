import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import { Route, Switch } from 'react-router-dom'
import Sidebar from '../sidebar'
import { connect } from 'react-redux'

const path = require('~constants').initialPath
const routes = [
	{ title: 'Магазины', path: `${path}shops`, component: loadable(() => import('./shops')) },

	{ title: 'Пользователи', path: `${path}users`, component: loadable(() => import('./users')) },
	{ title: 'Роли', path: `${path}roles`, component: loadable(() => import('./roles')) },
	{ title: 'Правила', path: `${path}rules`, component: loadable(() => import('./rules')) },

	{ title: 'Устройства', path: `${path}devices`, component: loadable(() => import('./devices')) },
	{ title: 'Документы', path: `${path}documents`, component: loadable(() => import('./documents')) },

	{ title: 'Товары', path: `${path}items`, component: loadable(() => import('./items')) },
	{ title: 'Атрибуты', path: `${path}attributes`, component: loadable(() => import('./attributes')) },
	{ title: 'Категории', path: `${path}categories`, component: loadable(() => import('./categories')) },

	{ title: 'Акции', path: `${path}discounts`, component: loadable(() => import('./discounts/list')) },
	{
		title: '',
		path: `${path}discount/create`,
		component: loadable(() => import('./discounts/promotion'))
	},
	{
		title: '',
		path: `${path}discount/:promotionId/update`,
		component: loadable(() => import('./discounts/promotion'))
	},

	{ title: 'Программы лояльности', path: `${path}loyalty`, component: loadable(() => import('./loyalty')) }
]

function MainPage() {
	return (
		<Fragment>
			<Sidebar {...{ routes }} />
			<Switch>
				{routes.map(({ path, component, title }, index) => (
					<Route {...{ path, component, exact: index === 0, key: `route-${title}` }} />
				))}
			</Switch>
		</Fragment>
	)
}

export default hot(module)(MainPage)
