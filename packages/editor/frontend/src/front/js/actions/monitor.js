import { requestCreator } from './actionCreators'
import { queryGenerator } from './widgetRequests'
import {
	REQUEST,
	SUCCESS,
	API_URL,
	API_URL_LAD,
	AUTH_BY_EVOTOR,
	GET_ALL_DASHBOARDS,
	DASHBOARD_GET,
	DASHBOARD_WIDGET_CONFIG_GET,
	DASHBOARD_WIDGET_GET,
	MONITOR_LOADED
} from '../constants'

export function preloadMonitor({ evotorToken, period }) {
	return async dispatch => {
		const authByEvotorData = await requestCreator(dispatch, {
			type: AUTH_BY_EVOTOR,
			API_URL: `${API_URL_LAD}/authByEvotorToken`,
			auth: `Bearer ${evotorToken}`,
			sendObject: { token: evotorToken }
		})

		const { appType, token } = authByEvotorData
		const orgId = authByEvotorData.org._id

		const allDashboardsData = await getAllDashboards({
			dispatch,
			appType,
			token,
			orgId
		})

		const dashboardId = await whatDashboardNeedToLoad(allDashboardsData)
		const dashboardData = await getDashboard({
			token,
			dashboardId,
			orgId,
			appType,
			dispatch
		})

		const { widgets } = dashboardData

		const widgetConfigs = await getWidgetConfigs({
			widgets,
			token,
			dashboardId,
			appType,
			dispatch
		})

		const widgetData = await getWidgets({
			widgets,
			widgetConfigs,
			dashboardId,
			dispatch,
			period
		})

		dispatch({
			type: MONITOR_LOADED + SUCCESS
		})
	}
}

function getAllDashboards({ dispatch, appType, token, orgId }) {
	return requestCreator(dispatch, {
		type: GET_ALL_DASHBOARDS,
		API_URL: `${API_URL_LAD}/apps/types/${appType}/run/monitor`,
		auth: `Bearer ${token}`,
		sendObject: {
			path: 'dashboard/getAll',
			method: 'POST',
			data: {
				orgId
			}
		}
	})
}

function whatDashboardNeedToLoad(dashboards) {
	// const needDashboards = dashboards.filter(dash => dash.group === 'editor')
	// const index = needDashboards.findIndex(el => el.group === 'editor' && el.active === true)
	// return dashboards[index >= 0 ? index : 0]._id
	return dashboards.find(dash => dash.alias === 'Редактор товаров. Товар')._id
}

function getDashboard({ token, dashboardId, orgId, appType, dispatch }) {
	return requestCreator(dispatch, {
		type: DASHBOARD_GET,
		API_URL: `${API_URL_LAD}/apps/types/${appType}/run/monitor`,
		auth: `Bearer ${token}`,
		sendObject: {
			path: 'dashboard/get',
			method: 'POST',
			data: {
				dashboardId,
				orgId
			}
		}
	})
}

function getWidgetConfigs({ widgets, token, dashboardId, appType, dispatch }) {
	return Promise.all(
		widgets.map(widget =>
			getWidgetConfig({
				token,
				widgetId: widget.i,
				widgetToken: widget.token,
				dashboardId,
				appType,
				dispatch
			})
		)
	)
}

function getWidgetConfig({ token, widgetId, widgetToken, dashboardId, appType, dispatch }) {
	return requestCreator(dispatch, {
		type: DASHBOARD_WIDGET_CONFIG_GET,
		API_URL: `${API_URL_LAD}/apps/types/${appType}/run/monitor`,
		auth: `Bearer ${token}`,
		sendObject: {
			path: `widget/${widgetId}?token=${widgetToken}`,
			method: 'GET'
		},
		other: { dashboardId, widgetId }
	})
}

function getWidgets({ widgets, widgetConfigs, dashboardId, dispatch, products, period, group }) {
	const widgetMap = {}
	widgets.map(widget => (widgetMap[widget.i] = widget.token))

	return Promise.all(
		widgetConfigs.map(config =>
			getWidget({
				config,
				widgetId: config.appId,
				widgetToken: widgetMap[config.appId],
				dispatch,
				dashboardId,
				products,
				period,
				group
			})
		)
	)
}

function getWidget({
	config,
	widgetToken,
	dispatch,
	dashboardId,
	widgetId,
	products,
	period,
	group
}) {
	return requestCreator(dispatch, {
		type: DASHBOARD_WIDGET_GET,
		API_URL: `${API_URL}/data/get`,
		auth: `Bearer ${widgetToken}`,
		sendObject: { query: queryGenerator({ config, products, period, group }) },
		other: { dashboardId, widgetId }
	})
}

export function updateMonitor({ period }) {
	return async (dispatch, getState) => {
		dispatch({
			type: MONITOR_LOADED + REQUEST
		})
		const { dashboards, widgetConfigs } = getState().monitor

		const dashboardId = await whatDashboardNeedToLoad(Object.values(dashboards))

		const widgetData = await getWidgets({
			widgets: dashboards[dashboardId].widgets,
			widgetConfigs: Object.values(widgetConfigs[dashboardId]),
			dashboardId,
			dispatch,
			products: getState().products,
			period,
			group: getState().products.navGroup
		})

		dispatch({
			type: MONITOR_LOADED + SUCCESS
		})
	}
}
