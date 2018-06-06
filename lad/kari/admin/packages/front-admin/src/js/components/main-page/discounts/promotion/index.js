import React, { Fragment, Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { createPromotion, getPromotions } from '~store/promotions/actions'
import { promotionFactory } from '~store/promotions/selectors'
import loadable from 'loadable-components'
import styles from './index.scss'
import get from 'lodash/get'

const FormNavigation = loadable(() => import('./navigation'))
const Checkbox = loadable(() => import('~modules/checkbox'))
const CheckboxLink = loadable(() => import('~modules/checkbox/link'))

class DiscountsForm extends Component {
	constructor(props) {
		super(props)
		this.path = props.match.url
		this.state = {
			//promotionId: get(props.promotion, 'promotionId', ''),
			trigger: {
				triggers: [
					{
						field: 'barcode',
						operator: '=',
						value: 'кеды'
					}
				]
			},
			algorithm: {
				ruleType: 'discountOnPosition',
				discount: {
					discount: 10,
					discountType: 'percent'
				},
				condition: {
					field: 'barcode',
					operator: '=',
					value: 'кеды'
				}
			},
			isEnabled: typeof props.promotion !== 'undefined' ? props.promotion.isEnabled : true
		}
	}

	componentDidMount() {
		const { promotionId } = this.props.match.params
		if (promotionId && typeof this.props.promotion === 'undefined') this.props.getPromotions({ promotionId })
	}

	getChildState = ({ state }) => this.setState({ ...this.state, ...state })

	handleSubmit = async event => {
		event.preventDefault()
		await this.setState({ isSubmit: true })
		const { isSubmit, ...sendState } = this.state
		this.props.createPromotion(sendState)
	}

	handleSwitch = () => this.setState({ isEnabled: !this.state.isEnabled })

	render() {
		const { closeId, promotion } = this.props

		const routes = [
			{ title: 'Общее', path: `${this.path}`, component: loadable(() => import('./common')) },
			{ title: 'Триггер', path: `${this.path}/trigger`, component: loadable(() => import('./trigger')) },
			{ title: 'Алгоритм', path: `${this.path}/algorithm`, component: loadable(() => import('./algorithm')) },
			{ title: 'Статистика', path: `${this.path}/statistics`, component: loadable(() => import('./statistics')) }
		]

		if (this.props.match.params.promotionId && typeof this.props.promotion === 'undefined') return <div />

		return (
			<section className={styles['page']}>
				<form className={styles['form']} onSubmit={this.handleSubmit}>
					<NavLink
						to={`/admin/discounts`}
						className={`${styles['button']} ${styles['undo-button']}`}
						activeClassName={styles['active']}
					>
						Назад
					</NavLink>

					{promotion && (
						<header className={styles['form-header']}>
							<h2 className={styles['form-header-title']}>{promotion.name}</h2>
							<Checkbox
								{...{
									id: `promo-switch-${closeId}`,
									handleChange: this.handleSwitch,
									isChecked: this.state.isEnabled,
									labelClass: styles['form-header-switch'],
									isCustom: true
								}}
							/>
						</header>
					)}
					<FormNavigation {...{ routes }} />
					<Switch>
						{routes.map(({ path, component: C, title }, index) => (
							<Route
								{...{
									path,
									render: () => <C {...{ valueTransfer: this.getChildState, promotion }} />,
									exact: index === 0,
									key: `route-${title}`
								}}
							/>
						))}
					</Switch>
					<button type="submit" className={`${styles['button']} ${styles['form-button']}`}>
						{this.props.match.params.promotionId ? 'Обновить' : 'Создать'}
					</button>
				</form>
			</section>
		)
	}
}

const mapStateToProps = (store, props) => {
	const promotionSelector = promotionFactory(),
		{ promotionId } = props.match.params
	return (store, props) => ({
		promotion: promotionSelector(store, { promotionId })
	})
}

const mapDispatchToProps = dispatch => bindActionCreators({ createPromotion, getPromotions }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(DiscountsForm))
