import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../reducers';
import integrationActions, {
  IntegrationActionsCreators
} from '../actions/integration';
import { WidgetsStore } from '../reducers/widgets';
import { IntegrationStore } from '../reducers/integration';
import AccessDialog from '../components/AccessDialog';

export type DialogProps = IntegrationStore & {
  widgets: WidgetsStore;
} & IntegrationActionsCreators;

class Container extends React.Component<DialogProps, {}> {
  componentWillMount() {
    if (this.props.tokens.length === 0) {
      const source = this.props.widgets.source;
      const ids = Object.keys(source);
      const myDashboardId = ids.filter(item => !source[item].copy)[0];
      const widgetId = source[myDashboardId].widgets[0].i;
      this.props.getTokens(widgetId);
    }
  }
  render() {
    if (this.props.tokens.length === 0) {
      return null;
    }
    return (
      <AccessDialog
        visible={this.props.accessDialog.visible}
        accessToken={this.props.tokens[0].accessToken}
        close={this.props.closeAccess}
      />
    );
  }
}

const mapStateToProps = (state: Store) => ({
  ...state.integration,
  widgets: state.widgets
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) =>
  Redux.bindActionCreators<any>(integrationActions, dispatch);

const DialogAccessTokens = connect<
  IntegrationStore & { widgets: WidgetsStore },
  IntegrationActionsCreators,
  {}
>(mapStateToProps, mapDispatchToProps)(Container);

export default DialogAccessTokens;
