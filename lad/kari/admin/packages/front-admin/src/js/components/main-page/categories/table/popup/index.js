import React from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './index.scss'
import { deleteCategory } from '~store/categories/actions'

function TablePopup({ data, deleteCategory }) {
	const { _id } = data
	const handleDelete = () => deleteCategory({ _id })

	return (
		<div>
			<button className={styles['button']} onClick={handleDelete}>
				Удалить
			</button>
		</div>
	)
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => bindActionCreators({ deleteCategory }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
