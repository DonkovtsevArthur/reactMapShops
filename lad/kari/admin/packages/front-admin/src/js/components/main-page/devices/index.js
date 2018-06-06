import React, { Fragment, Component } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import loadable from 'loadable-components'
import * as devicesActions from '~store/devices/actions'
import * as usersActions from '~store/users/actions'
import get from 'lodash/get'
import styles from './index.scss'

const Table = loadable(() => import('~modules/table'))
const TablePopup = loadable(() => import('./tablePopup'))
const FormCreateDevice = loadable(() => import('./formCreateDevice'))
const Select = loadable(() => import('~modules/select'))

class DevicesPage extends Component {
	state = {
		shopsOptions: [],
		activeShop: ''
	}

	render() {
		const {
			devices: { loadingDevices, intoShops, data: devicesData },
			users,
			createDevice
		} = this.props
		const { shopsOptions, activeShop } = this.state
		if ([loadingDevices, users.loadingUsers].some(flag => flag !== false) && activeShop.length) return <div />

		const columns = [
			{ label: '№', styleName: styles['number-column'] },
			{
				label: 'Тип',
				styleName: styles['type-column'],
				fieldFormat: ({ type }) => type
			},
			{
				label: 'Название',
				styleName: styles['name-column'],
				fieldFormat: ({ name }) => name
			},
			{
				label: 'Пользователи',
				styleName: styles['users-column'],
				fieldFormat: ({ users: usersIds }) =>
					!usersIds.length
						? ''
						: usersIds.map((usersId, index) => {
								const { surname, name } = users.data[usersId].meta
								return `${!!index ? ', ' : ''}${surname} ${name}`
						  })
			},
			{
				label: 'Теги',
				styleName: styles['tags-column'],
				fieldFormat: ({ tags }) => (!tags.length ? '' : '')
			}
		]

		const { tableData, tableList } = (() => {
			const tableData = {},
				shopId = typeof activeShop !== 'undedined' ? activeShop : 'NOT_BINDED'
			get(intoShops, `[${shopId}]`, []).forEach(deviceId => (tableData[deviceId] = devicesData[deviceId]))
			return { tableData, tableList: [...get(intoShops, `[${shopId}]`, [])] }
		})()

		return (
			<section className={`${styles['page']} ${styles['devices-page']}`}>
				<h1>Устройства</h1>
				<label className={`${styles['button']} ${styles['form-create-device-button']}`} htmlFor="form-create-device">
					Добавить устройство
				</label>

				<div className={styles['devices-nav']}>
					<h3 className={styles['devices-nav-title']}>Выберите магазин</h3>

					<Select
						// className={styles[`${closeId}-select`]}
						value={activeShop.length && shopsOptions.find(({ value }) => value === activeShop)}
						placeholder="Магазин"
						options={shopsOptions}
						onChange={this.handleChangeShop}
					/>
				</div>
				<Table
					{...{
						data: {
							list: tableList,
							data: tableData
						},
						columns: columns,
						TablePopup,
						styleName: styles['devices-table']
					}}
				/>

				<input type="checkbox" id="form-create-device" className={styles['checkbox-switch']} />
				<FormCreateDevice {...{ createDevice, closeId: 'form-create-device' }} />
			</section>
		)
	}

	async componentDidMount() {
		const { getDevices, users, shops, getUsers } = this.props
		if (typeof users.data === 'undefined') getUsers()
		await getDevices()

		//вынести в Select
		const shopsOptions = [],
			{ intoShops } = this.props.devices
		shops.list.forEach(shopId => {
			if (!shops.data[shopId].devices.length) return
			const { name = '', param, _id: value } = shops.data[shopId]
			const country = get(param, '[country]', ''),
				city = get(param, '[city]', '')
			const geo = !!`${country}${city}`.length
				? ` (${country ? country : ''}${city ? (country ? `, ${city}` : city) : ''})`
				: ''
			shopsOptions.push({ value, label: `${name}${geo}` })
		})

		get(intoShops, 'NOT_BINDED', []).length &&
			shopsOptions.push({
				value: 'NOT_BINDED',
				label: 'Не привязанные устройства'
			})

		this.setState({
			shopsOptions,
			activeShop: get(shopsOptions, '[0].value', '')
		})
	}

	handleChangeShop = ({ value }) => this.setState({ activeShop: value })
}

const mapStateToProps = ({ devices, users, shops }) => ({ devices, users, shops })
const mapDispatchToProps = dispatch => bindActionCreators({ ...devicesActions, ...usersActions }, dispatch)

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(DevicesPage))
