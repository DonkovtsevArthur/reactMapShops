import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import * as QueryString from 'query-string';
import { history } from '../store';
import { Store } from '../reducers';

import { AuthStore } from '../reducers/auth';

// actions
import authActions, { AuthActionCreators } from '../actions/auth';
// components
import ErrorScreen from '../components/ErrorScreen';
// containers
import Widgets from './Widgets';

export type MainProps = AuthStore & AuthActionCreators;

class Container extends React.Component<MainProps, {}> {
  componentWillMount() {
    const { token } = QueryString.parse(window.location.search);
    this.props.setUserInfo(token);
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            path="/"
            exact
            render={
              () => (
                this.props.token ?
                  <Widgets {...this.props} /> :
                  <ErrorScreen errorText="Нет авторизационного токена" />
              )
            }
          />
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: Store) => ({
  ...state.auth
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store>) => (
  Redux.bindActionCreators<any>(authActions, dispatch)
);

const Main = connect<AuthStore, AuthActionCreators, {}>(mapStateToProps, mapDispatchToProps)(Container);

export default Main;
