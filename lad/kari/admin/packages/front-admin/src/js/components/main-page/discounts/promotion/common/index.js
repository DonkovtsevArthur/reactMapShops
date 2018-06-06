import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import styles from './index.scss'
import { dateToDate, dateToDMY } from '~utils/date'
import get from 'lodash/get'

const Input = loadable(() => import('~modules/input'))
const Textarea = loadable(() => import('~modules/textarea'))
const Checkbox = loadable(() => import('~modules/checkbox'))
const CheckboxLink = loadable(() => import('~modules/checkbox/link'))

class PromotionCommon extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: get(props.promotion, 'name', ''),
			description: get(props.promotion, 'description', ''),
			priority: get(props.promotion, 'priority', 1),
			dateFrom: get(props.promotion, 'dateFrom', false) ? dateToDMY({ date: props.promotion.dateFrom }) : '',
			dateTo: get(props.promotion, 'dateTo', false) ? dateToDMY({ date: props.promotion.dateTo }) : '',
			promotionTarget: 'offlineStore'
		}
	}

	handleChange = ({ field, value }) => {
		this.setState({ [field]: value })
	}

	componentWillUnmount() {
		this.props.valueTransfer({ state: this.state })
	}

	render() {
		const nameHandle = ({ value }) => this.handleChange({ field: 'name', value })
		const descriptionHandle = ({ value }) => this.handleChange({ field: 'description', value })
		const priorityHandle = ({ value }) => this.handleChange({ field: 'priority', value })
		const dateFromHandle = ({ value }) => this.handleChange({ field: 'dateFrom', value: dateToDate({ date: value }) })
		const dateToHandle = ({ value }) => this.handleChange({ field: 'dateTo', value: dateToDate({ date: value }) })
		const targetHandle = ({ value }) => this.handleChange({ field: 'promotionTarget', value })

		return (
			<section className={styles['promotion-common']}>
				<Input
					{...{
						placeholder: 'Название',
						getValue: nameHandle,
						value: this.state.name,
						className: styles['field-name'],
						required: true
					}}
				/>
				<Input
					{...{
						placeholder: 'Приоритет',
						getValue: priorityHandle,
						value: this.state.priority,
						pattern: `^([1-9]|1[012])`,
						settings: 'isNumbers',
						className: styles['field-priority'],
						required: true
					}}
				/>
				<Textarea
					{...{
						getValue: descriptionHandle,
						placeholder: 'Описание',
						defaultValue: this.state.description,
						className: styles['field-description']
					}}
				/>
				<div className={styles['fields-date']}>
					<p>Время действия</p>
					<Input
						{...{
							placeholder: '01/01/2018',
							getValue: dateFromHandle,
							value: this.state.dateFrom,
							className: styles['field-date-from'],
							settings: 'isDate'
						}}
					/>
					<span>—</span>
					<Input
						{...{
							placeholder: '01/01/2222',
							getValue: dateToHandle,
							value: this.state.dateTo,
							className: styles['field-date-to'],
							settings: 'isDate'
						}}
					/>
				</div>
				<div className={styles['fields-targets']}>
					<Checkbox {...{ id: 'offlineStore', handleChange: targetHandle, isChecked: this.state.promotionTarget }} />
					<CheckboxLink {...{ id: 'offlineStore', labelText: 'Офлайн-магазин' }} />
					{/* <Checkbox {...{ id: 'internetStore' }} />
          <CheckboxLink {...{ id: 'internetStore', labelText: 'Офлайн-магазин' }} /> */}
				</div>
			</section>
		)
	}
}

export default hot(module)(PromotionCommon)
