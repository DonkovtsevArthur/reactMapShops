import * as React from 'react';

const ElementWindow: React.StatelessComponent<{}> = props => (
  <div className="elementWindow">
    {props.children}
  </div>
);

export default ElementWindow;
