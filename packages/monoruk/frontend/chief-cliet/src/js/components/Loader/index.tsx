import * as React from 'react';
import * as UI from 'material-ui';

const Loader: React.StatelessComponent = () => (
  <div className="loader">
    <UI.CircularProgress />
  </div>
);

export default Loader;
