import * as React from 'react';

export interface Props {
  title: string;
}

const Subtitle: React.StatelessComponent<Props> = props => (
  <h4 className="subtitle">{props.title}</h4>
);

export default Subtitle;
