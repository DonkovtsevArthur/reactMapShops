import * as React from 'react';

export interface Props {
  title: string;
}

const Title: React.StatelessComponent<Props> = props => <h3 className="title">{props.title}</h3>;

export default Title;
