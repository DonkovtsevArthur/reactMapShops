import * as React from 'react';

interface HorizontalContainerProps {
  className?: string;
  style?: any;
  lineLength?: number;
  margin?: number;
}

const HorizontalContainer: React.StatelessComponent<HorizontalContainerProps> = props => {
  return (
    <div
      className={`horizontalContainer ${props.className}`}
      style={{
        flexFlow: 'row wrap',
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
};

export default HorizontalContainer;
