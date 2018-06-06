import React, {Fragment, Component} from 'react'
import {hot} from 'react-hot-loader'
import loadable from 'loadable-components'
import {connect} from "react-redux";
import set from 'lodash/set'
import styles from './index.scss'

const Popup = loadable(() => import('~modules/popup'))
const Input = loadable(() => import('~modules/input'))
const Select = loadable(() => import('~modules/select'))

class RuleCreateForm extends Component {
	state = {
		name: '',
		rule: {
			action: "",
			target: ""
		},
		actionOptions: [
			{value: 'create', label: 'create'}, {value: 'update', label: 'update'},
			{value: 'delete', label: 'delete'}, {value: 'read', label: 'read'}
		],
		targetOptions: [
			{value: 'avaibility', label: 'avaibility'}, {value: 'rule', label: 'rule'}, {value: 'role', label: 'role'},
			{value: 'user', label: 'user'}, {value: 'goods', label: 'goods'}, {value: 'atribute', label: 'atribute'},
			{value: 'userGrants', label: 'userGrants'}, {value: 'categoryGoods', label: 'categoryGoods'},
			{value: 'categoryAtr', label: 'categoryAtr'}
		]
	}

	render() {
		const {
			props: {closeId}, state: {actionOptions, targetOptions, rule},
			handleSubmit, handleChange
		} = this
		const nameHandle = ({value}) => handleChange({field: 'name', value})
		const handleChangeAction = (props) => handleChange({field: 'rule.action', value: props !== null ? props.value : ''})
		const handleChangeTarget = (props) => handleChange({field: 'rule.target', value: props !== null ? props.value : ''})


		return <Popup {...{closeId, handleSubmit}}>
			<Input
				placeholder="Название"
				value={this.state.name}
				getValue={nameHandle}
				className={styles[`${closeId}-input`]}
				required
			/>
			<Select
				className={styles[`${closeId}-select`]}
				value={rule.action.length && actionOptions.find(({value}) => value === rule.action)}
				placeholder="Действие"
				options={actionOptions}
				onChange={handleChangeAction}
			/>
			<Select
				className={styles[`${closeId}-select`]}
				value={rule.target.length && targetOptions.find(({value}) => value === rule.target)}
				placeholder="Цель"
				options={targetOptions}
				onChange={handleChangeTarget}
			/>
			<button type='submit' className={`${styles['button']} ${styles[`${closeId}-button`]}`}>Создать</button>
		</Popup>
	}

	handleChange = ({field, value}) => this.setState(set(this.state, field, value))

	handleSubmit = () => this.props.createRule({rule: this.state})
}

const mapStateToProps = ({}) => ({})
const mapDispatchToProps = () => ({})

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(RuleCreateForm))