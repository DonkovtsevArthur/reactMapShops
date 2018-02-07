import * as React from 'react';

interface Props {
  dashboardId: string;
  remove(dashboardId: string): void;
}

const DeleteButton: React.StatelessComponent<Props> = props => (
  <button className="button__delete" onClick={() => props.remove(props.dashboardId)}>
    <i className="fa fa-remove" />
  </button>
);

export default DeleteButton;
