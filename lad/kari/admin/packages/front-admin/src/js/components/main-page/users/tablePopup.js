import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as usersActions from '~store/users/actions'
import styles from './popup.scss'

function TablePopup({ data, deleteUser }) {
	const {userId} = data
	// console.log(data)
	const handleClick = () => deleteUser({userId})
	return (
		<Fragment>
			<button onClick={handleClick}>Удалить</button>
			{/*<p>Id: <span>{userId}</span></p>*/}
		</Fragment>
	)
}


const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch =>
	bindActionCreators({...usersActions}, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
