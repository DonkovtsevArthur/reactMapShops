import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import * as usersActions from '~store/users/actions'
import styles from './index.scss'
import { dateToDMYHM } from '~utils/date'
import get from 'lodash/get'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./tablePopup'))
const FormCreateUser = loadable(() => import('./formCreateUser'))

class UsersPage extends Component {
	render() {
		const {
			users: { loadingUsers, data, list },
			createUser
		} = this.props
		if (loadingUsers !== false) return <div />

		const columns = [
			{ label: '№', styleName: styles['number-column'], field: '' },
			{
				label: 'Название',
				styleName: styles['role-column'],
				fieldFormat: ({ isAdmin, roles = [] }) =>
					isAdmin ? 'Админ' : roles.reduce((prev, current) => prev + (current ? `, ${current}` : ''), '')
			},
			{
				label: 'Ф.И.О',
				styleName: styles['name-column'],
				fieldFormat: ({ meta }) =>
					[get(meta, 'surname'), get(meta, 'name')].reduce((prev, current) => prev + (current ? `${current} ` : ''), '')
			},
			{
				label: 'Телефон',
				styleName: styles['phone-column'],
				fieldFormat: ({ meta }) => (get(meta, 'phone') ? <a href={`tel:${meta.phone}`}>{meta.phone}</a> : '')
			},
			{
				label: 'E-mail',
				styleName: styles['email-column'],
				fieldFormat: ({ meta }) => (get(meta, 'email') ? <a href={`mailto:${meta.email}`}>{meta.email}</a> : '')
			},
			{
				label: 'Изменён',
				styleName: styles['updated-column'],
				fieldFormat: ({ updated = '' }) => (updated ? dateToDMYHM({ date: updated }) : '')
			}
		]
		return (
			<section className={`${styles['page']} ${styles['users-page']}`}>
				<h1>Пользователи</h1>
				<label className={`${styles['button']} ${styles['users-button']}`} htmlFor="form-create-user">
					Создать пользователя
				</label>
				<Table
					{...{
						data: { data, list },
						columns: columns,
						TablePopup,
						styleName: styles['users-table']
					}}
				/>
				<input type="checkbox" id="form-create-user" className={styles['checkbox-switch']} />
				<FormCreateUser {...{ createUser, closeId: 'form-create-user' }} />
			</section>
		)
	}

	componentDidMount() {
		this.props.getUsers()
	}
}

const mapStateToProps = ({ users }) => ({ users })
const mapDispatchToProps = dispatch => bindActionCreators({ ...usersActions }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(UsersPage))
