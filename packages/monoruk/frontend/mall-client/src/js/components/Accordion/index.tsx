import * as React from 'react';
import * as UI from 'material-ui';
import { WidgetsProps } from '../../containers/Widgets';
import Widget from '../../containers/Widget';
import Access from '../../containers/Access';
import ErrorScreen from '../ErrorScreen';
import DeleteButton from '../DeleteButton';
import TimeLine from '../TimeLine';
import { WidgetConfig } from '../../reducers/widgets';

function filterPie(config: WidgetConfig, props: WidgetsProps) {
  if (config.section === 'storeUuid') {
    return props.market ? false : true;
  }
  return true;
}

class Accordion extends React.Component<WidgetsProps, {}> {
  getAccess = () => {
    const { source: dashboards, market, selectMarket } = this.props;
    const sources = Object.keys(dashboards);
    if (dashboards && sources) {
      const board = sources.filter(id => dashboards[id].active)[0];
      if (!dashboards[board].copy) {
        return (
          <UI.List>
            <UI.ListItem
              key={100}
              primaryText="Настройки интеграции"
              primaryTogglesNestedList={true}
              onClick={() => selectMarket('integration')}
              open={market === 'integration'}
              style={{
                backgroundColor:
                  market === 'integration' ? '#EC407A' : '#80DEEA',
                marginBottom: '2px',
                color: market === 'integration' ? 'white' : 'black'
              }}
              nestedItems={[<Access />]}
            />
          </UI.List>
        );
      }
      return null;
    }
    return null;
  }

  getWidgets = () => {
    const {
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

    widgetConfigs.forEach(widgetConfig => {
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
  };

  getData = () => {
    if (this.props.status === 'errorAccess') {
      return <ErrorScreen errorText="Доступ ограничен" />;
    }
    return (
      <UI.List key="1">
        {this.props.markets.length > 1 ? (
          <UI.ListItem
            key="2"
            primaryText="Сводная"
            primaryTogglesNestedList={true}
            onClick={() => this.props.selectMarket('')}
            open={this.props.market === ''}
            style={{
              backgroundColor: this.props.market === '' ? '#EC407A' : '#80DEEA',
              marginBottom: '2px',
              color: this.props.market === '' ? 'white' : 'black'
            }}
            nestedItems={[this.getWidgets()]}
          />
        ) : null}
        {this.props.markets.map(market => (
          <UI.ListItem
            key={market.storeUuid}
            primaryText={market.name}
            primaryTogglesNestedList={true}
            onClick={() => this.props.selectMarket(market.storeUuid)}
            open={this.props.market === market.storeUuid}
            style={{
              backgroundColor:
                this.props.market === market.storeUuid ? '#EC407A' : '#80DEEA',
              marginBottom: '2px',
              color: this.props.market === market.storeUuid ? 'white' : 'black'
            }}
            nestedItems={[this.getWidgets()]}
          />
        ))}
        {this.getAccess()}
      </UI.List>
    );
  }
  getDashboardList = () => {
    const dashboards = Object.keys(this.props.source);
    if (dashboards.length > 1) {
      return (
        <UI.List key={20}>
          {dashboards.map((dashboard: string) => {
            const board = this.props.source[dashboard];
            return (
              <UI.ListItem
                key={dashboard}
                primaryText={board.copy ? board.alias : 'Свои данные'}
                rightIcon={
                  board.copy ? (
                    <DeleteButton
                      remove={this.props.removeDashboard}
                      dashboardId={dashboard}
                    />
                  ) : (
                    <span />
                  )
                }
                primaryTogglesNestedList={true}
                onClick={() => this.props.selectDashboard(dashboard)}
                open={board.active}
                style={{
                  backgroundColor: board.active ? '#EC407A' : '#80DEEA',
                  marginBottom: '2px',
                  color: board.active ? 'white' : 'black'
                }}
                nestedListStyle={{ padding: '15px' }}
                nestedItems={[this.getData()]}
              />
            );
          })}
        </UI.List>
      );
    }
    return this.getData();
  };
  render() {
    return (
      <div className="dashboard-container">
        {this.getDashboardList()}
        {/* <UI.List>
          <UI.ListItem
            key={100}
            primaryText='Настройки интеграции'
            primaryTogglesNestedList={true}
            onClick={() => this.props.openIntegration('integration')}
            open={true}
            style={{
              backgroundColor: true ? '#EC407A' : '#80DEEA',
              marginBottom: '2px',
              color: true ? 'white' : 'black'
            }}
            nestedItems={[<Access />]}
          />
        </UI.List> */}
      </div>
    );
  }
}

export default Accordion;
