import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../reducers';
import integrationActions, { IntegrationActionsCreators } from '../actions/integration';
import { IntegrationStore } from '../reducers/integration';
import { WidgetsStore } from '../reducers/widgets';
import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';
import AccessTokens from '../components/AccessTokens';

export type AccessProps = { widgets: WidgetsStore } & IntegrationStore & IntegrationActionsCreators;

class Container extends React.Component<AccessProps, {}> {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
  }
  componentWillMount() {
    const dashboards = this.props.widgets.source;
    const dashboardsId = Object.keys(dashboards);
    const myDashboard = dashboardsId.filter(id => !dashboards[id].copy)[0];
    if (dashboards[myDashboard].widgets && dashboards[myDashboard].widgets.length > 0) {
      const widgetId = dashboards[myDashboard].widgets[0].i;
      this.props.getTokens(widgetId);
    }
  }
  // componentWillReceiveProps(nextProps: AccessProps) {
  //   const dashboards = nextProps.widgets.source;
  //   const dashboardsId = Object.keys(dashboards);
  //   const oldDashboards = nextProps.widgets.source;
  //   const oldDashboardsId = Object.keys(oldDashboards);
  //   const myDashboard = dashboardsId.filter(id => !dashboards[id].copy)[0];
  //   const myOldDashboard = oldDashboardsId.filter(id => !oldDashboards[id].copy)[0];
  //   const widgetsChange = dashboards[myOldDashboard].widgets.length !== oldDashboards[myDashboard].widgets.length;
  //   const notEmpty = oldDashboards[myDashboard].widgets.length > 0;
  //   if (widgetsChange && notEmpty) {
  //     const widgetId = dashboards[myDashboard].widgets[0].i;
  //     this.props.getTokens(widgetId);
  //   }
  // }
  getData() {
    const { widgets, ...props } = this.props;
    { console.log(props); }
    switch (this.props.status) {
    case 'request':
      return <Loader />;
    case 'error':
      return <ErrorScreen errorText="Не удалось получить токены доступа" />;
    case '':
      return <AccessTokens {...props}/>;
    default:
      return <Loader />;
    }
  }
  render() {
    return this.getData();
  }
}

const mapStateToProps = (state: Store) => ({
  ...state.integration,
  widgets: state.widgets
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) => (
  Redux.bindActionCreators<any>(integrationActions, dispatch)
);

const Access = connect<IntegrationStore, IntegrationActionsCreators, {}>(mapStateToProps, mapDispatchToProps)(Container);

export default Access;
