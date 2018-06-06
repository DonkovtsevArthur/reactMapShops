import { requestCreator } from '~utils/action-creators'
import { API_URL, API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST } from '~constants'
import { DOCUMENTS_GET } from './constants'

export function getDocuments({ store = '', deviceUuid = '', dateStart = '', dateEnd = '' }) {
	return (dispatch, getState) => {
		// if (!getState().documents.intoShops[store])
		return requestCreator(dispatch, {
			type: DOCUMENTS_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL}/documents${store && `/${store}`}`,
			sendObject: { dateStart, dateEnd },
			other: { storeId: store }
		})
	}
}
