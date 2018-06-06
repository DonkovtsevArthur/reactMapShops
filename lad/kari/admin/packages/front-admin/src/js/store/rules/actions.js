import { requestCreator } from '~utils/action-creators'
import { API_URL, API_URL_2, GET_REQUEST, POST_REQUEST, DELETE_REQUEST, PUT_REQUEST } from '~constants'
import { RULES_GET, RULE_CREATE, RULE_DELETE, RULE_UPDATE } from './constants'

export function getRules(/*{ruleId, ruleAction, ruleTarget, ruleName}*/) {
	return (dispatch, getState) =>
		/*(!getState().goods.groups) &&*/ requestCreator(dispatch, {
			type: RULES_GET,
			requestType: GET_REQUEST,
			requestUrl: `${API_URL_2}/rule`
		})
}

export function createRule({ rule: data }) {
	return (dispatch, getState) => {
		const { name, rule } = data
		requestCreator(dispatch, {
			type: RULE_CREATE,
			requestUrl: `${API_URL_2}/rule`,
			requestType: POST_REQUEST,
			sendObject: { name, rule },
			other: { name, rule }
		})
	}
}

export function updateRule({ ruleId, rule: data }) {
	return (dispatch, getState) => {
		const { name, rule } = data
		return requestCreator(dispatch, {
			type: RULE_UPDATE,
			requestUrl: `${API_URL_2}/rule`,
			requestType: PUT_REQUEST,
			sendObject: { ruleId, name, rule },
			other: { ruleId, name, rule }
		})
	}
}

export function deleteRule({ ruleId }) {
	return (dispatch, getState) =>
		requestCreator(dispatch, {
			type: RULE_DELETE,
			requestUrl: `${API_URL_2}/rule`,
			requestType: DELETE_REQUEST,
			sendObject: { ruleId },
			other: { ruleId }
		})
}
