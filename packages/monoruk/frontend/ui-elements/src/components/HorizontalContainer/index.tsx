import * as React from 'react';

interface HorizontalContainerProps {
  className?: string;
}

const HorizontalContainer: React.StatelessComponent<HorizontalContainerProps> = props => (
  <div className={`horizontalContainer ${props.className}`}>
    {props.children}
  </div>
);

export default HorizontalContainer;
