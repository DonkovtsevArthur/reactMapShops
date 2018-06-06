import React, {Fragment, Component} from 'react'
import {hot} from 'react-hot-loader'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import loadable from 'loadable-components'
import * as rulesActions from '~store/rules/actions'
import styles from './index.scss'
// import {dateToDMYHM} from '~utils/date'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./tablePopup'))
const FormCreateRule = loadable(() => import('./formCreateRule'))

class RulesPage extends Component {
	render() {
		const {rules: {loadingRules, data, list}, createRule} = this.props
		if (loadingRules !== false) return <div/>

		const columns = [
			{label: '№', styleName: styles['number-column'], field: ''},
			{
				label: 'Название',
				styleName: styles['name-column'],
				fieldFormat: ({name}) => name
			},
			{
				label: 'Действие',
				styleName: styles['action-column'],
				fieldFormat: ({rule: {action}}) => {
					let colorClass = ''
					switch (action) {
						case 'create': {
							colorClass = styles['blue']
							break
						}
						case 'update': {
							colorClass = styles['gold']
							break
						}
						case 'delete': {
							colorClass = styles['red']
							break
						}
						case 'read': {
							colorClass = styles['green']
							break
						}
					}
					return <span className={colorClass}>{action}</span>
				}
			},
			{
				label: 'Цель',
				styleName: styles['target-column'],
				fieldFormat: ({rule: {target}}) => target
			}
		]
		return <section className={`${styles['page']} ${styles['rules-page']}`}>
			<h1>Правила</h1>
			<label className={`${styles['button']} ${styles['rules-button']}`} htmlFor='form-create-rule'>Создать
				правило</label>

			<Table
				{...{
					data: {data, list},
					columns: columns,
					TablePopup,
					styleName: styles['rules-table']
				}}
			/>

			<input
				type="checkbox"
				id="form-create-rule"
				className={styles['checkbox-switch']}
			/>
			<FormCreateRule {...{createRule, closeId: "form-create-rule"}} />
		</section>
	}

	componentDidMount() {
		this.props.getRules()
	}
}

const mapStateToProps = ({rules}) => ({rules})
const mapDispatchToProps = dispatch => bindActionCreators({...rulesActions}, dispatch)


export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(RulesPage))