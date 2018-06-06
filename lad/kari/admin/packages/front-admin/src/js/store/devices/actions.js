import { requestCreator } from '~utils/action-creators'
import { API_URL, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, PUT_REQUEST } from '~constants'
import {
	DEVICES_GET,
	DEVICE_CREATE,
	DEVICE_DELETE,
	DEVICE_UPDATE,
	DEVICE_ADD_USERS,
	DEVICE_DELETE_USERS,
	DEVICE_BIND_STORE
} from './constants'
import difference from 'lodash/difference'

export function getDevices() {
	return (dispatch, getState) =>
		getState().devices.loadingDevices !== false &&
		requestCreator(dispatch, {
			type: DEVICES_GET,
			requestType: GET_REQUEST,
			requestUrl: '/devices'
		})
}

export function createDevice({ device }) {
	return dispatch =>
		requestCreator(dispatch, {
			type: DEVICE_CREATE,
			requestUrl: '/devices',
			requestType: POST_REQUEST,
			sendObject: device,
			other: { device }
		})
}

export function deleteDevice({ deviceId }) {
	return dispatch =>
		requestCreator(dispatch, {
			type: DEVICE_DELETE,
			requestUrl: `/devices/${deviceId}`,
			requestType: DELETE_REQUEST,
			other: { deviceId }
		})
}

export function updateDevice({ deviceId, device }) {
	return async (dispatch, getState) => {
		const { store, users, ...restOfDevice } = device

		switch (true) {
			case typeof store !== 'undefined': {
				await bindDeviceToStore({ deviceId, storeId: store, dispatch })
			}
			case typeof users !== 'undefined' && users.length: {
				const currentUsers = getState().devices.data[deviceId].users,
					usersForDelete = difference(currentUsers, users),
					usersForAdd = difference(users, currentUsers)
				usersForAdd.length && (await addUsersToDevice({ deviceId, users: usersForAdd, dispatch }))
				usersForDelete.length && (await deleteUsersFromDevice({ deviceId, users: usersForDelete, dispatch }))
			}
		}

		requestCreator(dispatch, {
			type: DEVICE_UPDATE,
			requestUrl: `/devices/${deviceId}`,
			requestType: PUT_REQUEST,
			sendObject: restOfDevice,
			other: { deviceId, ...restOfDevice }
		})
	}
}

const bindDeviceToStore = ({ deviceId, storeId, dispatch }) => {
	const request = disp =>
		requestCreator(disp, {
			type: DEVICE_BIND_STORE,
			requestUrl: `/devices/${deviceId}/joinStore`,
			requestType: PUT_REQUEST,
			sendObject: { store: storeId },
			other: { deviceId, storeId }
		})
	return typeof dispatch !== 'undefined' ? request(dispatch) : disp => request(disp)
}

const addUsersToDevice = ({ deviceId, users, dispatch }) => {
	const request = disp =>
		requestCreator(disp, {
			type: DEVICE_ADD_USERS,
			requestUrl: `/devices/${deviceId}/addUsers`,
			requestType: PUT_REQUEST,
			sendObject: { users },
			other: { deviceId, users }
		})
	return typeof dispatch !== 'undefined' ? request(dispatch) : disp => request(disp)
}

const deleteUsersFromDevice = ({ deviceId, users, dispatch }) => {
	const request = disp =>
		requestCreator(disp, {
			type: DEVICE_DELETE_USERS,
			requestUrl: `/devices/${deviceId}/deleteUsers`,
			requestType: PUT_REQUEST,
			sendObject: { users },
			other: { deviceId, users }
		})
	return typeof dispatch !== 'undefined' ? request(dispatch) : disp => request(disp)
}
