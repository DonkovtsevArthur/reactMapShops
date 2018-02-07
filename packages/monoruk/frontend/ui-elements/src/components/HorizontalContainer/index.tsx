import * as React from 'react';

const HorizontalContainer: React.StatelessComponent<{}> = props => (
  <div className="horizontalContainer">
    {props.children}
  </div>
);

export default HorizontalContainer;
