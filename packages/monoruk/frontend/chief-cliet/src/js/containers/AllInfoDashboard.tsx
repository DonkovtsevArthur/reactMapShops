import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as Hash from 'object-hash';
import widgetsActions, { WidgetsActionCreators } from '../actions/widgets';
import dashboardsActions, {
  DashboardsActionCreators
} from '../actions/dashboards';
import integrationActions, {
  IntegrationActionsCreators
} from '../actions/integration';
import { IntegrationStore } from '../reducers/integration';
import { Store, Location } from '../reducers';
import { WidgetsStore, WidgetConfig } from '../reducers/widgets';
import { DashboardsStore } from '../reducers/dashboards';
import UI from '../../../../ui-elements/src';
import Widget from './Widget';
import TimeLine from '../components/TimeLine';
import Dashboards from './Dashboards';
import Loader from '../components/Loader';
// import Header from '../components/Header';
import AddFranDialog from '../components/AddFranDialog';
import DialogAccessTokens from './DialogAccessTokens';

export type Actions = WidgetsActionCreators &
  DashboardsActionCreators &
  IntegrationActionsCreators;

interface IntegrationPropsChunk {
  integration: IntegrationStore;
}
interface DashboardPropsChunk {
  dashboards: DashboardsStore;
}
interface RoutingPropsChunk {
  routing: Location;
}
export type Props = IntegrationPropsChunk &
  WidgetsStore &
  DashboardPropsChunk &
  RoutingPropsChunk;

export type DashboardProps = Actions & Props;

function filterPie(config: WidgetConfig, props: DashboardProps) {
  if (config.section === 'storeUuid') {
    return props.market ? false : true;
  }
  return true;
}

class Container extends React.Component<DashboardProps, {}> {
  constructor(props: DashboardProps) {
    super(props);
    this.getData = this.getData.bind(this);
    this.getWidgets = this.getWidgets.bind(this);
    // this.getMarkets = this.getMarkets.bind(this);
  }
  componentWillMount() {
    const source = this.props.source;
    const ids = Object.keys(source);
    const active = ids.filter(item => source[item].active)[0];
    const my = ids.filter(item => !source[item].copy)[0];
    if (source[active].copy) {
      this.props.selectDashboard(my);
    }
  }
  getWidgets = () => {
    const {
      widgetConfigs,
      widgets,
      getAllData,
      updateAllDataWidget,
      subscriptions,
      subscribe,
      updateIndexDynamicWidgetsAllData
    } = this.props;

    const line: any[] = [];
    const column: any[] = [];
    const pie: any[] = [];
    const errors: any[] = [];
    const source = this.props.source;
    const dashboardsIds = Object.keys(this.props.source);
    const userDashboardId = dashboardsIds.filter(item => !source[item].copy)[0];
    const userWidgets = source[userDashboardId].widgets;
    if (userWidgets) {
      const userWidgetConfigs = widgetConfigs.filter(config =>
        userWidgets.some(item => item.i === config.appId)
      );
      userWidgetConfigs.forEach(widgetConfig => {
        const widget = (
          <Widget
            {...widgets[widgetConfig.appId]}
            appId={widgetConfig.appId}
            getData={getAllData}
            updateWidget={updateAllDataWidget}
            period={widgetConfig.period}
            key={widgetConfig.appId}
            subscriptions={subscriptions[widgetConfig.appId]}
            subscribe={subscribe}
            dataSourceId={widgetConfig.dataSourceId}
            widgetConfig={widgetConfig}
            updateIndexDynamicWidgets={updateIndexDynamicWidgetsAllData}
            market={this.props.market}
            allInfo
          />
        );
        switch (widgetConfig.graph) {
          case 'pie':
            filterPie(widgetConfig, this.props) && pie.push(widget);
            break;
          case 'bar':
            column.push(widget);
            break;
          case 'count':
            line.push(widget);
            break;
          default:
            errors.push(widget);
        }
      });
      return (
        <div className="widgets">
          <TimeLine
            updateWidget={this.props.updateAllDataWidget}
            period={this.props.widgetConfigs[0].period}
            appId={this.props.widgetConfigs[0].appId}
          />
          <div className="widget-graph-container">{column}</div>
          <div className="widget-counters-container">{line}</div>
          <div className="pie-graph-container">{pie}</div>
          <div className="widgets__errors">{errors}</div>
        </div>
      );
    }
    return <Loader />;
  };
  getDashboards() {
    const source = this.props.source;
    const status = this.props.status;
    const dashboardsIds = Object.keys(this.props.source);
    const activeDashboard = dashboardsIds.filter(
      item => source[item].active
    )[0];
    if (source[activeDashboard].widgets) {
      const activeWidget = source[activeDashboard].widgets[0];
      if (status === 'success') {
        console.info('config length', this.props.widgetConfigs.length);
        const period = this.props.widgetConfigs.filter(
          item => item.appId === activeWidget.i
        )[0].period;
        const hash = Hash.sha1({ period });
        if (
          !this.props.dashboards.data[hash] &&
          this.props.dashboards.status === ''
        ) {
          this.props.getProceeds();
        }
        return dashboardsIds.map(id => (
          <Dashboards
            alias={source[id].alias}
            dashboardId={id}
            hash={hash}
            remove={this.props.removeDashboard}
          />
        ));
      }
      return <Loader />;
    }
    return <Loader />;
  }
  getData() {
    const source = this.props.source;
    const dashboardsIds = Object.keys(this.props.source);
    const userDashboardId = dashboardsIds.filter(item => !source[item].copy)[0];
    const userDashboard = source[userDashboardId];
    if (userDashboard.active) {
      return (
        <>
          {/* <Header
          openDialogAddFran={this.props.open}
          openAccess={this.props.openAccess}
        /> */}
          <AddFranDialog
            accessToken={this.props.integration.dialog.accessToken}
            addFran={this.props.addFran}
            alias={this.props.integration.dialog.alias}
            visible={this.props.integration.dialog.visible}
            changeAccessToken={this.props.changeAccessToke}
            changeAlias={this.props.changeAlias}
            close={this.props.close}
          />
          <DialogAccessTokens />
          <div className="dashboard">
            <UI.MainTitle text="Сводные данные" />
            {this.getWidgets()}
            {this.getDashboards()}
            {/* {this.getAccess()} */}
          </div>
        </>
      );
    }
    return (
      <div className="dashboard">
        <UI.MainTitle text="Сводные данные" />
        <Loader />
      </div>
    );
  }
  render() {
    return this.getData();
  }
}
const mapStateToProps = (state: Store) => ({
  ...state.widgets,
  integration: state.integration,
  dashboards: state.dashboards,
  routing: state.routing.location
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) =>
  Redux.bindActionCreators<any>(
    { ...widgetsActions, ...dashboardsActions, ...integrationActions },
    dispatch
  );

const AllInfoDashboard = connect<Props, Actions, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default AllInfoDashboard;
