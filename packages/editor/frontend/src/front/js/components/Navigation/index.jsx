import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => (
	<nav>
		<NavLink exact activeClassName="activeNavLink" to="/settings">
			Настройка
		</NavLink>
		<NavLink activeClassName="activeNavLink" to="/print">
			Печать
		</NavLink>
		<NavLink activeClassName="activeNavLink" to="/help">
			Помощь
		</NavLink>
	</nav>
)

export default Navigation
