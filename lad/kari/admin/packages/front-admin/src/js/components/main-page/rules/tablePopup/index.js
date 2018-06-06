import React, {Fragment} from 'react'
import {hot} from 'react-hot-loader'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import loadable from 'loadable-components'
import * as rulesActions from '~store/rules/actions'
import styles from './index.scss'

const FormUpdateRule = loadable(() => import('../formUpdateRule'))

function TablePopup({data: rule, deleteRule, updateRule}) {
	const {ruleId} = rule, formUpdateId = `form-update-rule-${ruleId}`, handleDelete = () => deleteRule({ruleId})
	return (
		<Fragment>
			<label className={`${styles['button']}`} htmlFor={formUpdateId}>Обновить</label>
			<button onClick={handleDelete}>Удалить</button>
			<input type="checkbox" id={formUpdateId} className={styles['checkbox-switch']}/>
			<FormUpdateRule {...{updateRule, rule, closeId: formUpdateId}} />
		</Fragment>
	)
}


const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => bindActionCreators({...rulesActions}, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(TablePopup))
