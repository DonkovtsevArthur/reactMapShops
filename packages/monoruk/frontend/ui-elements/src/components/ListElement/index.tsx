import * as React from 'react';

export interface ListElementProps {
  index: number;
  color: string;
  name: string;
  value: string;
  currency?: boolean;
  last?: boolean;
}

const ListElement: React.StatelessComponent<ListElementProps> = props => (
  <div
    className="ui-listElement"
    style={{
      borderBottom: props.last ? 'none' : '1px solid rgba(230, 227, 232, 0.5)'
    }}
  >
    <div className="right">
      <span className="index">
        {props.last ? <span style={{ visibility: 'hidden' }}>11</span> : props.index}
      </span>
      <span className="color" style={{ backgroundColor: props.color }} />
      <span className="name">{props.name}</span>
    </div>
    <span className="value">
      {props.value} {props.currency ? <i className="fa fa-ruble" /> : null}
    </span>
  </div>
);

export default ListElement;
