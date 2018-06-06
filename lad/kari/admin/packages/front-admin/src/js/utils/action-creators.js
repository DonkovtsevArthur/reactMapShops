import { REQUEST, SUCCESS, FAIL, GET_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST, API_URL } from '~constants'
import axios from 'axios'

export function axiosInitialization({ token }) {
	axios.defaults.baseURL = API_URL
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export async function requestCreator(dispatch, action) {
	const { type, requestType, requestUrl: url, resultField = 'data', headers = {}, sendObject, other } = action

	dispatch({ type: type + REQUEST, other })

	let method, data, params
	switch (requestType) {
		case GET_REQUEST: {
			method = 'get'
			params = sendObject
			break
		}
		case POST_REQUEST: {
			method = 'post'
			data = sendObject
			break
		}
		case PUT_REQUEST: {
			method = 'put'
			data = sendObject
			break
		}
		case DELETE_REQUEST: {
			method = 'delete'
			params = sendObject
			break
		}

		default: {
			console.log(`${requestType} - неизвестный тип запроса`)
			return
		}
	}

	await axios({ method, url, data, params, headers })
		.then(result => dispatch({ type: type + SUCCESS, payload: result[resultField], other }))
		.catch(error => dispatch({ type: type + FAIL, error: error.message }))
}
