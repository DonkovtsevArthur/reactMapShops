import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import widgetsActions, { WidgetsActionCreators } from '../actions/widgets';
import { WidgetsStore } from '../reducers/widgets';
import { Store } from '../reducers';
import TabsHeader from '../components/TabsHeader';
import ErrorScreen from '../components/ErrorScreen';
import Loader from '../components/Loader';

export type WidgetsProps = WidgetsStore & WidgetsActionCreators;

class Container extends React.Component<WidgetsProps, {}> {
  constructor(props: WidgetsProps) {
    super(props);
    this.getContent = this.getContent.bind(this);
  }
  componentWillMount() {
    this.props.getSource();
  }
  getContent() {
    switch (this.props.status) {
      case 'request':
        return <Loader />;
      case 'error':
        return <ErrorScreen errorText="Ошибка при получении виджетов" />;
      case '':
        return <TabsHeader {...this.props} />;
      default:
        return <Loader />;
    }
  }
  render() {
    return this.getContent();
  }
}

const mapStateToProps = (state: Store) => ({
  ...state.widgets
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) =>
  Redux.bindActionCreators<any>(widgetsActions, dispatch);

const Widgets = connect<WidgetsStore, WidgetsActionCreators, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Widgets;
