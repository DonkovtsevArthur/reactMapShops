import * as React from 'react';

export interface TitleProps {
  text: string;
}

const Title: React.StatelessComponent<TitleProps> = props => (
  <div>
    <h2 className="ui-title">{props.text}</h2>
  </div>
);

export default Title;
