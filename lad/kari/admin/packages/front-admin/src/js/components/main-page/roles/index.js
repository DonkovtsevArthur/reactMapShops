import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import { getRoles, createRole } from '~store/roles/actions'
import { rolesDataGetter, rolesListGetter } from '~store/roles/selectors'
import styles from './index.scss'

const FormCreateRole = loadable(() => import('./form'))
const RolesTable = loadable(() => import('./table'))

class RolesPage extends Component {
	componentDidMount() {
		this.props.getRoles()
	}

	render() {
		const { createRole, rolesData, rolesList, loadingRoles } = this.props

		return (
			<section className={`${styles['page']} ${styles['roles-page']}`}>
				<h1>Роли</h1>
				<label className={`${styles['button']} ${styles['role-button']}`} htmlFor="form-create-role">
					Создать роль
				</label>
				<input type="checkbox" id="form-create-role" className={styles['checkbox-switch']} />
				<FormCreateRole {...{ handleSubmit: createRole, closeId: 'form-create-role', submitButton: 'Создать' }} />
				{!loadingRoles && <RolesTable data={{ data: rolesData, list: rolesList }} />}
			</section>
		)
	}
}

const mapStateToProps = ({ roles, rules }) => ({
	loadingRoles: roles.loadingRoles,
	rolesData: rolesDataGetter({ roles }),
	rolesList: rolesListGetter({ roles })
})
const mapDispatchToProps = dispatch => bindActionCreators({ getRoles, createRole }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(RolesPage))
