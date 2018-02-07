import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import widgetsActions, { WidgetsActionCreators } from '../actions/widgets';
import { Source } from '../reducers/widgets';
import { Store } from '../reducers';
import ErrorScreen from '../components/ErrorScreen';
import Loader from '../components/Loader';

interface Props {
  source: Source;
  status: string;
}

export type WidgetsProps = Props & WidgetsActionCreators;

class Container extends React.Component<WidgetsProps, {}> {
  constructor(props: WidgetsProps) {
    super(props);
    this.getContent = this.getContent.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }
  componentWillMount() {
    const dashboardsId = Object.keys(this.props.source);
    if (dashboardsId.length === 0) {
      this.props.getSource();
    }
  }
  redirectToDashboard() {
    console.info('Dealing start!');
    const source = this.props.source;
    const dashboards = Object.keys(source);
    const activeDashboard = dashboards.filter(dashboard => source[dashboard].active)[0];
    if (!activeDashboard) {
      const my = dashboards.filter(item => !source[item].copy)[0];
      return <Redirect to={`/${my}`} />;
    }
    if (dashboards.length > 1) {
      if (source[activeDashboard].copy) {
        return <Redirect to={`/${activeDashboard}`} />;
      }
      return <Redirect to="/allInfo" />; // allInfo
    }
    return <Redirect to={`/${activeDashboard}`} />;
  }
  getContent() {
    console.info('status ----------------------------------------------------->', this.props.status);
    switch (this.props.status) {
    case '':
    case 'request':
      return <Loader />;
    case 'error':
      return <ErrorScreen errorText="Ошибка при получении виджетов" />;
    case 'errorAccess':
    case 'success':
      return this.redirectToDashboard();
    default:
      return <Loader />;
    }
  }
  render() {
    return this.getContent();
  }
}

const mapStateToProps = (state: Store) => ({
  source: state.widgets.source,
  status: state.widgets.status
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) =>
  Redux.bindActionCreators<any>(widgetsActions, dispatch);

const Widgets = connect<Props, WidgetsActionCreators, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Widgets;
