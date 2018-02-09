import * as React from 'react';
import * as Redux from 'redux';
import { WidgetData, WidgetConfig } from '../reducers/widgets';
import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';
import Line from '../components/Line';
import TimeLine from '../components/TimeLine';
import { WidgetsActions } from '../actions/widgets';
import { Store } from '../reducers';
import UI from 'monoruk-ui-elements';
import { COLORS } from '../constants';
// import CheckerWindgetIndex from '../components/CheckerWindgetIndex';

export interface Actions {
  getData(id: string): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => void;
  getDebtors5(
    id: string
  ): (dispatch: Redux.Dispatch<WidgetsActions>, getStore: () => Store) => void;
  updateWidget(id: string, config: WidgetConfig): void;
}

interface WidgetProps extends Actions {
  widgetConfig: WidgetConfig;
  widgetData: WidgetData;
}

class Widget extends React.Component<WidgetProps, {}> {
  constructor(props: WidgetProps) {
    super(props);
    this.getContent = this.getContent.bind(this);
    this.getCheckerStatus = this.getCheckerStatus.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  componentWillMount() {
    this.props.getData(this.props.widgetConfig.appId);
    if (this.props.widgetConfig.index === 'receivables') {
      this.props.getDebtors5(this.props.widgetConfig.appId);
    }
  }
  getContent() {
    if (this.props.widgetData) {
      switch (this.props.widgetData.status) {
        case 'request':
          return <Loader />;
        case 'error':
          return <ErrorScreen errorText="Не удалось получить данные" />;
        case 'success':
          return this.props.widgetData.debtors5 ? (
            <UI.VerticalContainer>
              <Line graphData={this.props.widgetData.graphData} />
              <UI.PieGraphAndList
                title="Список должников"
                graphData={this.props.widgetData.debtors5}
                colors={COLORS}
                last={false}
                currency
              />
            </UI.VerticalContainer>
          ) : (
            <Line graphData={this.props.widgetData.graphData} />
          );
        default:
          return <Loader />;
      }
    }
    return <Loader />;
  }
  getCheckerStatus() {
    const index = this.props.widgetConfig.index;
    if (index === 'contractsReceivables' || index === 'contractsPayables') {
      return true;
    }
    return false;
  }
  handleCheck() {
    const widgetConfig = this.props.widgetConfig;
    const appId = widgetConfig.appId;
    const index = widgetConfig.index;
    switch (index) {
      case 'contractsReceivables':
        this.props.updateWidget(appId, { ...this.props.widgetConfig, index: 'receivables' });
        return;
      case 'contractsPayables':
        this.props.updateWidget(appId, { ...this.props.widgetConfig, index: 'payables' });
        return;
      case 'receivables':
        this.props.updateWidget(appId, {
          ...this.props.widgetConfig,
          index: 'contractsReceivables'
        });
        return;
      case 'payables':
        this.props.updateWidget(appId, { ...this.props.widgetConfig, index: 'contractsPayables' });
        return;
      default:
        return;
    }
  }
  render() {
    return (
      <div className="main__content">
        <TimeLine
          updateWidget={this.props.updateWidget}
          period={this.props.widgetConfig.period}
          appId={this.props.widgetConfig.appId}
        />
        {/* <CheckerWindgetIndex
          label="Учитывать договоры"
          checked={this.getCheckerStatus()}
          checkProps={this.handleCheck}
        /> */}
        {this.getContent()}
      </div>
    );
  }
}

export default Widget;
