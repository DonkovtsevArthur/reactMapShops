import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './index.scss'
import { deleteRole, updateRole } from '~store/roles/actions'
import loadable from 'loadable-components'

const FormUpdateRole = loadable(() => import('../../form'))

function TablePopup({ data, deleteRole, updateRole }) {
	const { roleId } = data
	const handleDelete = () => deleteRole({ roleId })
	const handleUpdate = role => updateRole({ roleId, ...role })

	return (
		<div>
			<button className={styles['button']} onClick={handleDelete}>
				Удалить
			</button>

			<label className={`${styles['button']}`} htmlFor={`form-update-role-${roleId}`}>
				Обновить
			</label>
			<input type="checkbox" id={`form-update-role-${roleId}`} className={styles['checkbox-switch']} />
			<FormUpdateRole
				{...{
					handleSubmit: handleUpdate,
					roleId,
					closeId: `form-update-role-${roleId}`,
					submitButton: 'Обновить',
					formName: styles['table-popup-form-update']
				}}
			/>
		</div>
	)
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => bindActionCreators({ deleteRole, updateRole }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
