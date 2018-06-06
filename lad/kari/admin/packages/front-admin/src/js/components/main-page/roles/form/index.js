import React, { Fragment, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getRules } from '~store/rules/actions'
import { rulesToSelect } from '~store/rules/selectors'
import { roleFactory } from '~store/roles/selectors'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'
import get from 'lodash/get'

const Input = loadable(() => import('~modules/input'))
const Select = loadable(() => import('~modules/select'))
const isDev = process.env.NODE_ENV === `development`

class RoleForm extends Component {
	state = { name: '', rulesIds: [] }

	componentDidMount() {
		this.props.getRules()
	}

	// static getDerivedStateFromProps(nextProps, props) {
	// if (nextProps.loadingRules === false && nextProps.role) {
	// this.setState({
	// 	rulesIds: get(nextProps.role, 'rules', []).map(({ rule: { ruleId } }) =>
	// 		nextProps.rulesOptions.find(({ value }) => value === ruleId)
	// 	)
	// })
	// console.log(nextProps, props)
	// 	nextProps.getItems && nextProps.getItems({ storeId: nextProps.storeId, limit: 100, offset: 0 })
	// 	return { storeId: nextProps.storeId }
	// }
	// return nextProps
	// }

	handleChange = ({ field, value }) => this.setState({ [field]: value })
	handleChangeRules = options => {
		this.setState({ rulesIds: options.map(({ value }) => value) })
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.handleSubmit({ ...this.state })
		event.target.querySelector(`[class*='${this.props.closeId}-close']`).click()
		this.setState({ name: '', rulesIds: [] })
	}

	render() {
		const { closeId, loadingRules, rulesOptions, role, submitButton, formName } = this.props
		const nameHandle = ({ value }) => this.handleChange({ field: 'name', value })
		const selectValue = this.state.rulesIds.length
			? rulesOptions.find(({ value }) => value === rulesOptions)
			: get(role, 'rules', []).map(({ _id: ruleId }) => rulesOptions.find(({ value }) => value === ruleId))

		return (
			<form className={`${styles['form']} ${formName}`} onSubmit={this.handleSubmit}>
				<label className={`${styles['form-close']}  ${closeId}-close`} htmlFor={closeId} />
				<Input placeholder="Название роли" getValue={nameHandle} value={get(role, 'name', '')} required />
				{!loadingRules &&
					rulesOptions.length && (
						<Select
							className={styles['form-select']}
							value={selectValue}
							placeholder="Правила"
							options={rulesOptions}
							onChange={this.handleChangeRules}
							isMulti
						/>
					)}
				<button type="submit" className={`${styles['button']} ${styles['form-button']}`}>
					{submitButton}
				</button>
			</form>
		)
	}
}

const mapStateToProps = ({ roles }, props) => {
	const roleSelector = roleFactory()
	return ({ rules }, props) => ({
		loadingRules: rules.loadingRules,
		rulesOptions: rulesToSelect({ rules }),
		role: roleSelector({ roles }, props)
	})
}

const mapDispatchToProps = dispatch => bindActionCreators({ getRules }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(RoleForm))
