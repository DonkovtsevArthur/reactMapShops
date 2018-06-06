import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

function Navigation({ routes }) {
	return (
		<nav className={styles['navigaton']}>
			{routes.map(({ title, path, component }) => (
				<NavLink
					to={path}
					className={styles['navigaton-link']}
					activeClassName={styles['active']}
					onMouseOver={component.load}
					exact
					key={title}
				>
					{title}
				</NavLink>
			))}
		</nav>
	)
}

export default hot(module)(Navigation)
