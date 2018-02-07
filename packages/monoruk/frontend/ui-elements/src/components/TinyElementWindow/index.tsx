import * as React from 'react';

export interface TinyElementWindowProps {
  className?: string;
}

const TinyElementWindow: React.StatelessComponent<TinyElementWindowProps> = props => (
  <div className={`ui-tinyElementWindow ${props.className}`}>
    {props.children}
  </div>
);

export default TinyElementWindow;
