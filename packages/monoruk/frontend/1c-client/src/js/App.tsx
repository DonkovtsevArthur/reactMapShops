import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactRedux from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import store from './store';
import Main from './containers/Main';

const muiTheme1 = getMuiTheme({
  tabs: {
    selectedBackgroundColor: '#B3E5FC',
    selectedTextColor: '#000000'
  } });

const App = () => (
  <ReactRedux.Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme1}>
      <Main />
    </MuiThemeProvider>
  </ReactRedux.Provider>
);

ReactDom.render(<App />, document.getElementById('root'));
