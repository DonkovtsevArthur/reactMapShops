import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import * as devicesActions from '~store/devices/actions'
import styles from './popup.scss'

const FormUpdateDevice = loadable(() => import('./formUpdateDevice'))

function TablePopup({ data: device, deleteDevice, updateDevice }) {
	const { _id: deviceId } = device
	const handleDelete = () => deleteDevice({ deviceId })

	return (
		<Fragment>
			<label className={`${styles['button']}`} htmlFor={`form-update-device-${deviceId}`}>
				Обновить
			</label>
			<button onClick={handleDelete}>Удалить</button>
			<input type="checkbox" id={`form-update-device-${deviceId}`} className={styles['checkbox-switch']} />
			{/*<FormUpdateDevice {...{ updateDevice, deviceId, closeId: `form-update-device-${deviceId}` }} />*/}
		</Fragment>
	)
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => bindActionCreators({ ...devicesActions }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
