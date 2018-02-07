import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import widgetsActions, { WidgetsActionCreators } from '../actions/widgets';
import dashboardsActions, { DashboardsActionCreators } from '../actions/dashboards';
import integrationActions, { IntegrationActionsCreators } from '../actions/integration';
import marketsActions, { MarketsActionCreators } from '../actions/markets';
import { DashboardsStore } from '../reducers/dashboards';
import { IntegrationStore } from '../reducers/integration';
import { MarketsStore } from '../reducers/markets';
import { Store, Location } from '../reducers';
import { WidgetsStore, WidgetConfig } from '../reducers/widgets';
import ErrorScreen from '../components/ErrorScreen';
import UI from '../../../../ui-elements/src';
import Widget from './Widget';
import TimeLine from '../components/TimeLine';
import Markets from './Markets';
import Loader from '../components/Loader';
import Header from '../components/Header';
import DialogAccessTokens from './DialogAccessTokens';
import AddFranDialog from '../components/AddFranDialog';

export type Actions =
  WidgetsActionCreators &
  DashboardsActionCreators &
  IntegrationActionsCreators &
   MarketsActionCreators;
export type Props =
  { integration: IntegrationStore } &
  WidgetsStore &
  { stores: MarketsStore } &
  { dashboards: DashboardsStore } &
  { routing: Location };

export type DashboardProps = Props & Actions;

function filterPie(config: WidgetConfig, props: DashboardProps) {
  if (props.markets <= 1 && config.section === 'storeUuid') {
    return false;
  }
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
    this.getMarkets = this.getMarkets.bind(this);
  }
  componentWillMount() {
    const [dashboardId, marketId] = this.props.routing.pathname.split('/').slice(1);
    const source = this.props.source;
    const ids = Object.keys(source);
    const active = ids.filter(item => source[item].active)[0];
    const notActive = active !== dashboardId;
    const notAllInfo = dashboardId !== 'allInfo';
    if (notActive && notAllInfo) {
      this.props.selectDashboard(dashboardId);
    }
    if (marketId) {
      this.props.selectMarket(marketId);
    } else {
      this.props.removeMarket();
    }
  }
  componentWillReceiveProps(nextProps: DashboardProps) {
    const newMarketId = nextProps.routing.pathname.split('/').slice(1)[1];
    const marketId = this.props.routing.pathname.split('/').slice(1)[1];
    if (marketId !== newMarketId && newMarketId) {
      this.props.selectMarket(newMarketId);
    }
    if (!newMarketId) {
      this.props.removeMarket();
    }
  }
  getWidgets = () => {
    const {
      source,
      widgetConfigs,
      widgets,
      getData,
      updateWidget,
      subscriptions,
      subscribe,
      updateIndexDynamicWidgets
    } = this.props;

    const line: any[] = [];
    const column: any[] = [];
    const pie: any[] = [];
    const errors: any[] = [];
    const [dashboardId] = this.props.routing.pathname.split('/').slice(1);
    const activeWidgets = source[dashboardId].widgets;
    if (activeWidgets) {
      const configs = widgetConfigs.filter(item => activeWidgets.some(active => active.i === item.appId));
      configs.forEach(widgetConfig => {
        const widget = (
          <Widget
            {...widgets[widgetConfig.appId]}
            appId={widgetConfig.appId}
            getData={getData}
            updateWidget={updateWidget}
            period={widgetConfig.period}
            key={widgetConfig.appId}
            subscriptions={subscriptions[widgetConfig.appId]}
            subscribe={subscribe}
            dataSourceId={widgetConfig.dataSourceId}
            widgetConfig={widgetConfig}
            updateIndexDynamicWidgets={updateIndexDynamicWidgets}
            market={this.props.market}
            allInfo={false}
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
            updateWidget={this.props.updateWidget}
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
  }
  getMarkets(dashboardId: string) {
    if (this.props.source[dashboardId].widgets) {
      const widgetId = this.props.source[dashboardId].widgets[0].i;
      const config = this.props.widgetConfigs.filter(item => item.appId === widgetId)[0];
      if (config) {
        const period = config.period;
        return (
          <Markets
            dashboardId={dashboardId}
            period={period}
          />
        );
      }
      return (
        <UI.ElementWindow>
          <Loader />
        </UI.ElementWindow>
      );
    }
    return (
      <UI.ElementWindow>
        <Loader />
      </UI.ElementWindow>
    );
  }
  getTitle(market: string, nameMarket: string, dashboardName: string, dashboardId: string) {
    const dashboards = Object.keys(this.props.source);
    if (market) {
      return (
          <UI.MainTitle text={nameMarket} >
            <Link to={`/${dashboardId}`} >
              <i className="fa fa-long-arrow-left" />
            </Link>
          </UI.MainTitle>
      );
    }
    if (dashboards.length > 1) {
      return (
          <UI.MainTitle text={dashboardName} >
            <Link to="/allInfo" >
              <i className="fa fa-long-arrow-left" />
            </Link>
          </UI.MainTitle>
      );
    }
    return <UI.MainTitle text={dashboardName} />;
  }
  getData() {
    const market = this.props.market;
    const stores = this.props.stores.data;
    const source = this.props.source;
    const [dashboardId] = this.props.routing.pathname.split('/').slice(1);
    if (source[dashboardId] && source[dashboardId].widgets && source[dashboardId].widgets.length > 0 && this.props.status !== 'request' && this.props.status) {
      const dashboardName = source[dashboardId].copy ? source[dashboardId].alias : 'Свои данные';
      let nameMarket = '';
      if (market) {
        const marketHash = Object.keys(stores);
        marketHash.some((hash) => {
          return stores[hash].some((store) => {
            if (store.uuid === market) {
              nameMarket = store.alias;
              return true;
            }
            return false;
          });
        });
      }
      if (this.props.status === 'errorAccess') {
        return <ErrorScreen errorText="Доступ ограничен" />;
      }
      return (
        < >
          <Header
            openDialogAddFran={this.props.open}
            openAccess={this.props.openAccess}
          />
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
            {this.getTitle(market, nameMarket, dashboardName, dashboardId)}
            {this.getWidgets()}
            {this.props.market || this.props.markets <= 1 ? null : this.getMarkets(dashboardId)}
          </div>
        </ >
      );
    }
    return <Loader />;
  }
  render() {
    return this.getData();
  }
}
const mapStateToProps = (state: Store) => ({
  ...state.widgets,
  integration: state.integration,
  dashboards: state.dashboards,
  routing: state.routing.location,
  stores: state.markets
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) =>
  Redux.bindActionCreators<any>({
    ...widgetsActions,
    ...dashboardsActions,
    ...integrationActions,
    ...marketsActions
  }, dispatch);

const Dashboard = connect<Props, Actions, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Dashboard;
