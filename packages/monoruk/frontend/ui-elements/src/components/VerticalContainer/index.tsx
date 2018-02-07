import * as React from 'react';

const VerticalContainer: React.StatelessComponent<{}> = props => (
  <div className="verticalContainer">
    {props.children}
  </div>
);

export default VerticalContainer;
