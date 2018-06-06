import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import styles from './sidebar.scss'

function Sidebar({ routes }) {
	return (
		<aside className={styles['sidebar']}>
			<nav className={styles['sidebar-nav']}>
				{routes.map(
					({ title, path, component }) =>
						title.length ? (
							<NavLink
								to={path}
								className={styles['sidebar-nav-link']}
								activeClassName={styles['active']}
								onMouseOver={component.load}
								key={title}
							>
								{title}
							</NavLink>
						) : null
				)}
			</nav>
		</aside>
	)
}

export default hot(module)(Sidebar)
