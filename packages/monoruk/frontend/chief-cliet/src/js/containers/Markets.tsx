import * as React from 'react';
import * as Redux from 'redux';
import * as Hash from 'object-hash';
import * as numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from '../reducers';
import marketsActions, { MarketsActionCreators } from '../actions/markets';
import { MarketsStore } from '../reducers/markets';
import UI from 'monoruk-ui-elements';
import Loader from '../components/Loader';
import ErrorScreen from '../components/ErrorScreen';

export interface MarketsProps {
  dashboardId: string;
  period: string;
}

interface Props {
  markets: MarketsStore;
}

export type MarketsParam = Props & MarketsActionCreators & MarketsProps;

class Container extends React.Component<MarketsParam, {}> {
  constructor(props: MarketsParam) {
    super(props);
    this.getData = this.getData.bind(this);
  }
  componentWillMount() {
    const dashboardId = this.props.dashboardId;
    const period = this.props.period;
    const hash = Hash.sha1({ dashboardId, period });
    if (!this.props.markets.data[hash]) {
      this.props.getMarketsProceeds(dashboardId);
    }
  }
  componentWillReceiveProps(nextProps: MarketsParam) {
    const dashboardId = nextProps.dashboardId;
    const period = nextProps.period;
    const status = nextProps.markets.status !== 'request';
    const hash = Hash.sha1({ dashboardId, period });
    if (!this.props.markets.data[hash] && status) {
      this.props.getMarketsProceeds(dashboardId);
    }
  }
  getData() {
    const dashboardId = this.props.dashboardId;
    const period = this.props.period;
    const hash = Hash.sha1({ dashboardId, period });
    if (this.props.markets.data[hash]) {
      switch (this.props.markets.status) {
        case 'request':
          return (
            <UI.ElementWindow>
              <Loader />
            </UI.ElementWindow>
          );
        case 'error':
          return (
            <UI.ElementWindow>
              <ErrorScreen errorText="Ошибка получения магазинов" />
            </UI.ElementWindow>
          );
        case 'success':
        case '':
          const data = this.props.markets.data[hash];
          const markets =
            data.length > 1
              ? data.map(store => {
                  const procent =
                    (store.x - store.x1) / (store.x + store.x1) * 100;
                  return (
                    <UI.InformationPanel
                      prev={numeral(procent).format('0,0[.]00')}
                      text={store.alias}
                      type="Выручка"
                      value={numeral(store.x).format('0,0[.]00')}
                      currency
                      less={procent < 0}
                      key={store.uuid}
                    >
                      <UI.RoundButton>
                        <Link to={`/${dashboardId}/${store.uuid}`}>
                          Показать статистику
                        </Link>
                      </UI.RoundButton>
                    </UI.InformationPanel>
                  );
                })
              : null;
          return markets;
        default:
          return (
            <UI.ElementWindow>
              <Loader />
            </UI.ElementWindow>
          );
      }
    }
    return null;
  }
  render() {
    return this.getData();
  }
}

const mapStateToProps = (state: Store) => ({
  markets: state.markets
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) =>
  Redux.bindActionCreators<any>(marketsActions, dispatch);

const Markets = connect<Props, MarketsActionCreators, MarketsProps>(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Markets;
