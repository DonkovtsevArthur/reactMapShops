import * as React from 'react';

export interface ElementWindowProps {
  className?: string;
  style?: any;
}

const ElementWindow: React.StatelessComponent<ElementWindowProps> = props => (
  <div className={`elementWindow ${props.className}`} style={props.style}>
    {props.children}
  </div>
);

export default ElementWindow;
