import { REQUEST, SUCCESS, FAIL, CACHE } from '~constants'
import {
	DEVICES_GET,
	DEVICE_CREATE,
	DEVICE_DELETE,
	DEVICE_UPDATE,
	DEVICE_ADD_USERS,
	DEVICE_DELETE_USERS,
	DEVICE_BIND_STORE
} from './constants'
import { normalizeEntity } from '~utils/normalize'
import { removeElement } from '~utils/immutable'

const initialState = {
	loadingDevices: null
}

export default (state = initialState, { type, payload = {}, other = {} }) => {
	const { error } = payload

	switch (type) {
		case DEVICES_GET + REQUEST: {
			return { ...state, loadingDevices: true }
		}

		case DEVICES_GET + SUCCESS: {
			const devices = payload,
				{ data, list } = normalizeEntity({ data: { ...devices }, key: '_id' }),
				intoShops = divideIntoShops({ devices: devices })
			return { ...state, loadingDevices: false, data, list, intoShops }
		}

		case DEVICE_CREATE + SUCCESS: {
			const { device } = other,
				deviceId = payload

			return {
				...state,
				list: [...state.list, deviceId],
				intoShops: {
					...state.intoShops,
					[device.store]: [...state.intoShops[device.store], deviceId]
				},
				data: {
					...state.data,
					[deviceId]: { ...device, _id: deviceId }
				}
			}
		}

		case DEVICE_BIND_STORE + SUCCESS: {
			const { deviceId, storeId } = other
			const oldStore = this.state.data[deviceId].store
			// console.log(other, oldStore)
			return {
				...state,
				data: { ...this.state.data, [deviceId]: { ...this.state.data[deviceId], store: storeId } },
				intoShops: {
					...this.state.intoShops,
					[oldStore]: removeElement({ arr: this.state.intoShops[oldStore], value: oldStore }),
					[storeId]: [...this.state.intoShops[storeId], storeId]
				}
			}
		}

		case DEVICE_ADD_USERS + SUCCESS: {
			return { ...state }
		}

		case DEVICE_DELETE_USERS + SUCCESS: {
			return { ...state }
		}

		case DEVICE_UPDATE + SUCCESS: {
			const { deviceId, device: changesToDevice } = other
			return {
				...state,
				data: {
					...state.data,
					[deviceId]: { ...state.data[deviceId], ...changesToDevice }
				}
			}
		}

		case DEVICE_DELETE + SUCCESS: {
			const { deviceId } = other
			return {
				...state,
				list: removeElement({ arr: state.list, value: deviceId }),
				data: removeElement({ obj: state.data, keys: deviceId }),
				intoShops: {
					...state.intoShops,
					[state.data[deviceId].store]: removeElement({
						arr: state.intoShops[state.data[deviceId].store],
						value: deviceId
					})
				}
			}
		}

		default: {
			return state
		}
	}
}

function divideIntoShops({ devices }) {
	const res = {}
	devices.forEach(({ store, _id }) => {
		const storeId = typeof store !== 'undefined' ? store : 'NOT_BINDED'
		if (typeof res[storeId] === 'undefined') res[storeId] = []
		res[storeId].push(_id)
	})
	return res
}
