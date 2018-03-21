import {
	REQUEST,
	SUCCESS,
	ERROR,
	GET_ALL_DASHBOARDS,
	DASHBOARD_GET,
	DASHBOARD_WIDGET_CONFIG_GET,
	DASHBOARD_WIDGET_GET,
	MONITOR_LOADED
} from '../constants'

const initialState = {
	dashboards: {},
	widgetConfigs: {},
	widgetData: {},
	loadingDashboards: null,
	loadingDashboard: null,
	loadingWidgetConfigs: null,
	loadingWidget: null,
	loadingMonitor: null,
	errorMessage: ''
}

export default (state = initialState, { type, errorMessage, payload, other }) => {
	switch (type) {
		case GET_ALL_DASHBOARDS + REQUEST:
			return { ...state, loadingDashboards: true, loadingMonitor: true }

		case GET_ALL_DASHBOARDS + ERROR:
			return {
				...state,
				errorMessage,
				loadingDashboards: null,
				loadingMonitor: null
			}

		case GET_ALL_DASHBOARDS + SUCCESS: {
			const editorDashboards = payload.filter(dashboard => dashboard.group === 'editor')
			const normalizeArr = []
			editorDashboards.map(el => {
				normalizeArr[el._id] = el
			})
			return {
				...state,
				loadingDashboards: false,
				dashboards: { ...normalizeArr }
			}
		}

		case DASHBOARD_GET + REQUEST:
			return { ...state, loadingDashboard: true }

		case DASHBOARD_GET + ERROR:
			return {
				...state,
				errorMessage,
				loadingDashboard: null,
				loadingMonitor: null
			}

		case DASHBOARD_GET + SUCCESS: {
			const { _id, ...dashboard_body } = payload
			return {
				...state,
				loadingDashboard: false,
				dashboards: {
					...state.dashboards,
					[_id]: { ...state.dashboards[_id], ...dashboard_body }
				}
			}
		}

		case DASHBOARD_WIDGET_CONFIG_GET + REQUEST:
			return { ...state, loadingWidgetConfigs: true }

		case DASHBOARD_WIDGET_CONFIG_GET + ERROR:
			return {
				...state,
				errorMessage,
				loadingWidgetConfigs: null,
				loadingMonitor: null
			}

		case DASHBOARD_WIDGET_CONFIG_GET + SUCCESS: {
			const { dashboardId, widgetId } = other

			return {
				...state,
				loadingWidgetConfigs: false,
				widgetConfigs: {
					...state.widgetConfigs,
					[dashboardId]: {
						...state.widgetConfigs[dashboardId],
						[widgetId]: payload
					}
				}
			}
		}

		case DASHBOARD_WIDGET_GET + REQUEST:
			return { ...state, loadingWidget: true }

		case DASHBOARD_WIDGET_GET + ERROR:
			return {
				...state,
				errorMessage,
				loadingWidget: null,
				loadingMonitor: null
			}

		case DASHBOARD_WIDGET_GET + SUCCESS: {
			const { dashboardId, widgetId } = other

			return {
				...state,
				loadingWidget: false,
				widgetData: {
					...state.widgetData,
					[dashboardId]: {
						...state.widgetData[dashboardId],
						[widgetId]: payload
					}
				}
			}
		}

		case MONITOR_LOADED + REQUEST: {
			return {
				...state,
				loadingMonitor: true
			}
		}

		case MONITOR_LOADED + SUCCESS: {
			return {
				...state,
				loadingMonitor: false
			}
		}

		default:
			return state
	}
}
