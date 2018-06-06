const isDev = process.env.NODE_ENV === `development`

module.exports = {
	initialPath: '/admin/',
	LOCAL_STORAGE_NAME: 'KARI_ADMIN',
	API_URL: `http://178.20.233.159:81`, //${isDev ? ':81' : ''}
	API_URL_2: `http://178.20.233.159:8081`, //${isDev ? '81' : '80'}
	API_URL_3: `http://178.20.233.159:9090`,
	REQUEST: '_REQUEST',
	SUCCESS: '_SUCCESS',
	CACHE: '_CACHE',
	FAIL: '_FAIL',
	GET_REQUEST: 'GET_REQUEST',
	POST_REQUEST: 'POST_REQUEST',
	PUT_REQUEST: 'PUT_REQUEST',
	DELETE_REQUEST: 'DELETE_REQUEST'
}
