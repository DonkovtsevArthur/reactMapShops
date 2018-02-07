import * as React from 'react';

export interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.StatelessComponent<TitleProps> = props => (
  <h2 className={`ui-mainTitle ${props.className}`}>
    {props.children}
    {props.text}
  </h2>
);

export default Title;
