import * as React from 'react';

export interface VerticalContainerProps {
  className?: string;
  style?: any;
}

const VerticalContainer: React.StatelessComponent<VerticalContainerProps> = props => (
  <div className={`verticalContainer ${props.className}`} style={props.style}>
    {props.children}
  </div>
);

export default VerticalContainer;
