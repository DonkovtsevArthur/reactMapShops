import * as React from 'react';
import * as ReactRedux from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import Main from './containers/Main';

const App: React.StatelessComponent<{}> = () => (
  <ReactRedux.Provider store={store}>
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  </ReactRedux.Provider>
);

export default App;
