import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as shopsActions from '~store/shops/actions'
import styles from './popup.scss'

function TablePopup({ data, deleteShop }) {
	const handleClick = () => deleteShop({storeId: data._id})
	return (
		<Fragment>
			<button onClick={handleClick}>Удалить</button>
		</Fragment>
	)
}


const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch =>
	bindActionCreators({...shopsActions}, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
