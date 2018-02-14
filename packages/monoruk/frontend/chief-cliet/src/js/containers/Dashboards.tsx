import * as React from 'react';
import * as Redux from 'redux';
import * as numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from '../reducers';
import dashboardsActions, {
  DashboardsActionCreators
} from '../actions/dashboards';
import { DashboardsStore } from '../reducers/dashboards';
import UI from 'monoruk-ui-elements';
import * as Material from 'material-ui';

export interface DashboardsProps {
  dashboardId: string;
  alias: string;
  hash: string;
  remove: (id: string) => void;
}

export type DashboardsParam = DashboardsStore &
  DashboardsActionCreators &
  DashboardsProps;

class Container extends React.Component<DashboardsParam, {}> {
  constructor(props: DashboardsParam) {
    super(props);
    this.getData = this.getData.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove() {
    this.props.remove(this.props.dashboardId);
  }
  getData() {
    switch (this.props.status) {
      case 'request':
        return (
          <UI.InformationPanel
            prev="0"
            text={this.props.alias}
            type="Выручка"
            value="...загрузка"
            currency
            load
          >
            <UI.RoundButton>
              <Link to={`/${this.props.dashboardId}`}>Показать статистику</Link>
            </UI.RoundButton>
          </UI.InformationPanel>
        );
      case 'error':
        return (
          <UI.InformationPanel
            prev="0"
            text={this.props.alias}
            type="Выручка"
            value="Ошибка"
            currency
          >
            <UI.RoundButton>
              <Link to={`/${this.props.dashboardId}`}>Показать статистику</Link>
            </UI.RoundButton>
          </UI.InformationPanel>
        );
      case '':
        const data = this.props.data[this.props.hash].filter(
          item => item.org === this.props.alias
        );
        let x: number = -1;
        let x1: number = -1;
        if (data.length === 1) {
          x = data[0].x;
          x1 = data[0].x1;
        }
        const procent = (x - x1) / (x + x1) * 100;
        return (
          <UI.InformationPanel
            prev={x1 < 0 ? '' : numeral(procent).format('0,0[.]00')}
            text={this.props.alias}
            type="Выручка"
            value={x < 0 ? '' : numeral(x).format('0,0[.]00')}
            currency
            less={procent < 0}
          >
            <UI.RoundButton>
              <Link to={`/${this.props.dashboardId}`}>Показать статистику</Link>
            </UI.RoundButton>
            <Material.IconMenu
              iconButtonElement={
                <button
                  className="button__actions"
                  disabled={
                    this.props.alias === 'Мои магазины' ||
                    this.props.alias === 'Рабочий стол'
                  }
                >
                  <i className="fa fa-ellipsis-v" />
                </button>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <Material.MenuItem
                primaryText="Удалить"
                onClick={this.handleRemove}
              />
            </Material.IconMenu>
          </UI.InformationPanel>
        );
      default:
        return (
          <UI.InformationPanel
            prev="0"
            text={this.props.alias}
            type="Выручка"
            value="...загрузка"
            currency
            load
          >
            <UI.RoundButton>
              <Link to={`/${this.props.dashboardId}`}>Показать статистику</Link>
            </UI.RoundButton>
          </UI.InformationPanel>
        );
    }
  }
  render() {
    return this.getData();
  }
}

const mapStateToProps = (state: Store) => ({
  ...state.dashboards
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) =>
  Redux.bindActionCreators<any>(dashboardsActions, dispatch);

const Dashboards = connect<
  DashboardsStore,
  DashboardsActionCreators,
  DashboardsProps
>(mapStateToProps, mapDispatchToProps)(Container);

export default Dashboards;
