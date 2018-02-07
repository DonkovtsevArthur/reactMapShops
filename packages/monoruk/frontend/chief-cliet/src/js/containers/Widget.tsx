import * as React from 'react';
import * as Redux from 'redux';
import { WidgetData, WidgetConfig } from '../reducers/widgets';
import Loader from '../components/Loader';
import Line from '../components/Line';
import { WidgetsActions } from '../actions/widgets';
import { Store } from '../reducers';
import Count from '../components/Count';
import Pie from '../components/Pie';
import { getTitleParamFromConfig } from '../helper';
import IndexLine from '../components/IndexLine';
import UI from '../../../../ui-elements/src';

export interface Actions {
  getData(
    id: string
  ): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => void;
  updateWidget(id: string, period: string): void;
  subscribe(id: string): void;
  updateIndexDynamicWidgets(index: string, indexAction: string): void;
}

export interface Props {
  appId: string;
  dataSourceId: string;
  subscriptions: boolean;
  widgetConfig: WidgetConfig;
  market: string;
  allInfo: boolean;
}

type WidgetProps = Props & WidgetData & Actions;

function getPieTitle(config: WidgetConfig, allInfo: boolean) {
  if (config.section === 'productName') {
    return 'Выручка. ТОП 10 товаров';
  }
  if (config.section === 'storeUuid' && !allInfo) {
    return `${getTitleParamFromConfig(config).title}. ТОП 10 магазинов`;
  }
  if (config.section === 'storeUuid' && allInfo) {
    return `${getTitleParamFromConfig(config).title}. ТОП 10 франчайзи`;
  }
  return '';
}

class Widget extends React.Component<WidgetProps, {}> {
  constructor(props: WidgetProps) {
    super(props);
    this.getContent = this.getContent.bind(this);
    this.getWidgetType = this.getWidgetType.bind(this);
    this.getClass = this.getClass.bind(this);
  }
  componentWillMount() {
    this.props.getData(this.props.appId);
    // if (!this.props.subscriptions) {
    // const url = `${API_MONITOR}/widget/${this.props.dataSourceId}/events`;
    // const eventSource = new window.EventSource(url);
    // eventSource.onmessage = (e: any) => {
    //   if (e.data === 'reload') {
    //     this.props.getData(this.props.appId);
    //   }
    // };
    // this.props.subscribe(this.props.appId);
    // }
  }
  componentWillReceiveProps(nextProps: WidgetProps) {
    if (nextProps.market !== this.props.market) {
      this.props.getData(this.props.appId);
    }
  }
  getWidgetType() {
    const graph = this.props.widgetConfig.graph;
    const measure = getTitleParamFromConfig(this.props.widgetConfig).measure;
    switch (graph) {
      case 'bar':
        return (
          <UI.ElementWindow>
            <IndexLine
              index={this.props.widgetConfig.index}
              indexAction={this.props.widgetConfig.indexAction}
              updateIndexDynamicWidgets={this.props.updateIndexDynamicWidgets}
            />
            <Line
              graphData={this.props.graphData}
              period={this.props.period}
              measure={measure}
            />
          </UI.ElementWindow>
        );
      case 'count':
        return <Count {...this.props} />;
      case 'pie':
        return (
          <Pie
            graphData={this.props.graphData}
            section={this.props.widgetConfig.section}
            measure={measure}
            title={getPieTitle(this.props.widgetConfig, this.props.allInfo)}
          />
        );
      default:
        return <h3>Ошибка вызова</h3>;
    }
  }
  getClass() {
    switch (this.props.widgetConfig.graph) {
      case 'count':
        return 'widget-counter';
      case 'bar':
      case 'pie':
        return 'elementWindow';
      default:
        return '';
    }
  }
  getContent() {
    switch (this.props.status) {
      case 'request':
        return (
          <div className={this.getClass()}>
            <Loader />
          </div>
        );
      case 'error':
        return null;
      case 'success':
        return this.getWidgetType();
      default:
        return <Loader />;
    }
  }
  render() {
    return this.getContent();
  }
}

export default Widget;
