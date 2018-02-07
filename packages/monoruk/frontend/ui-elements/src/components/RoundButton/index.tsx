import * as React from 'react';

const RoundButtom: React.StatelessComponent<{}> = props => (
  <div className="ui-roundButton">
    {props.children}
  </div>
);

export default RoundButtom;
