export default function setToken(token) {
	return dispatch => {
		dispatch({
			type: 'SET_TOKEN',
			token
		})
	}
}
