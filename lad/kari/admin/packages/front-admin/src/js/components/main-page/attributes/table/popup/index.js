import React from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './index.scss'
import { deleteAttribute } from '~store/attributes/actions'

function TablePopup({ data, deleteAttribute }) {
	const { _id } = data
	const handleDelete = () => deleteAttribute({ _id })

	return (
		<div>
			<button className={styles['button']} onClick={handleDelete}>
				Удалить
			</button>
		</div>
	)
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => bindActionCreators({ deleteAttribute }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
