import { REQUEST, SUCCESS, ERROR } from '../constants'
import agent from 'superagent'

export const requestCreator = (dispatch, action) => {
	const { type, API_URL, auth, sendObject, other } = action

	dispatch({
		type: type + REQUEST
	})

	return agent
		.post(API_URL)
		.set('authorization', auth)
		.send(sendObject)
		.then(result => {
			if (result.error) throw new Error(result.error.msg)
			return new Promise(function(resolve, reject) {
				dispatch({
					type: type + SUCCESS,
					payload: result.body,
					other
				})
				resolve(result.body)
			})
		})
		.catch(error => {
			dispatch({
				type: type + ERROR,
				errorMessage: error.message
			})
		})
}
