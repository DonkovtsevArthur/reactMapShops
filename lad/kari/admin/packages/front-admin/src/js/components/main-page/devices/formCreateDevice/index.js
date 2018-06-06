import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import loadable from 'loadable-components'
import { connect } from 'react-redux'
import get from 'lodash/get'
import styles from './index.scss'

const Popup = loadable(() => import('~modules/popup'))
const Input = loadable(() => import('~modules/input'))
const Select = loadable(() => import('~modules/select'))
const isDev = process.env.NODE_ENV === `development`

class DeviceCreateForm extends Component {
	state = {
		name: '',
		type: 'POS',
		users: [],
		tags: [],
		store: '',
		// param: {os: 'Android', hotpoint: true},
		shopsOptions: [],
		usersOptions: []
	}

	render() {
		const {
			props: { closeId, shops },
			state: { shopsOptions, store: activeShopId, usersOptions, users },
			handleSubmit,
			handleChange
		} = this
		const nameHandle = ({ value }) => handleChange({ field: 'name', value })
		const handleChangeShop = props => handleChange({ field: 'store', value: props !== null ? props.value : '' })
		const handleChangeUser = props => handleChange({ field: 'users', value: props })

		return (
			<Popup {...{ closeId, handleSubmit }}>
				<Input
					placeholder="Название"
					value={this.state.name}
					getValue={nameHandle}
					className={styles[`${closeId}-input`]}
					required
				/>
				<Select
					className={styles[`${closeId}-select`]}
					value={activeShopId.length && shopsOptions.find(({ value }) => value === activeShopId)}
					placeholder="Выбрать магазин"
					options={shopsOptions}
					onChange={handleChangeShop}
				/>
				<Select
					className={styles[`${closeId}-select`]}
					value={users.length && users}
					placeholder="Выбрать пользователя"
					options={usersOptions}
					onChange={handleChangeUser}
					isMulti
				/>
				<button type="submit" className={`${styles['button']} ${styles[`${closeId}-button`]}`}>
					Создать
				</button>
			</Popup>
		)
	}

	componentDidMount() {
		const { shops, users } = this.props,
			shopsOptions = {}

		this.setState({
			shopsOptions: get(shops, `.list`, []).map(shopId => {
				const { name = '', param, _id: value } = shops.data[shopId]
				const country = get(param, '[country]', ''),
					city = get(param, '[city]', '')
				const geo = !!`${country}${city}`.length
					? ` (${country ? country : ''}${city ? (country ? `, ${city}` : city) : ''})`
					: ''
				return { value, label: `${name}${geo}` }
			}),
			usersOptions: get(users, `.list`, []).map(userId => {
				const { meta } = users.data[userId]
				const surname = get(meta, '[surname]', ''),
					name = get(meta, '[name]', '')
				const label = !!(surname + name).length
					? `${surname ? surname : ''}${name ? (surname ? ` ${name}` : name) : ''}`
					: ''
				return { value: userId, label }
			})
		})
	}

	handleChange = ({ field, value }) => this.setState({ [field]: value })

	handleSubmit = () => {
		const device = {},
			deviceParams = ['name', 'type', 'users', 'tags', 'store' /*'param'*/]
		deviceParams.forEach(key => {
			if (this.state[key])
				if (key === 'users') device[key] = this.state[key].map(({ value }) => value)
				else device[key] = this.state[key]
		})
		this.props.createDevice({ device })
		this.setState({ name: '', /*type: '',*/ users: [], tags: [], store: '' })
	}
}

const mapStateToProps = ({ devices, users, shops }) => ({ devices, users, shops })
const mapDispatchToProps = () => ({})

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(DeviceCreateForm))
