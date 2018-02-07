import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Store } from '../reducers';
import integrationActions, { IntegrationActionsCreators } from '../actions/integration';
import { IntegrationStore } from '../reducers/integration';
import AddFranDialog from '../components/AddFranDialog';

export type DialogProps = IntegrationStore & IntegrationActionsCreators;

class Container extends React.Component<DialogProps, {}> {
  render() {
    return (
      <AddFranDialog
        {...this.props.dialog}
        changeAccessToken={this.props.changeAccessToke}
        changeAlias={this.props.changeAlias}
        close={this.props.close}
        addFran={this.props.addFran}
      />
    );
  }
}

const mapStateToProps = (state: Store) => ({
  ...state.integration
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) => (
  Redux.bindActionCreators<any>(integrationActions, dispatch)
);

const Dialog = connect<IntegrationStore, IntegrationActionsCreators, {}>(mapStateToProps, mapDispatchToProps)(Container);

export default Dialog;
