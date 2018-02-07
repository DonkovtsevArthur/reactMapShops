import * as React from 'react';

interface Props {
  openDialogAddFran(): void;
}

const AddFran: React.StatelessComponent<Props> = props => {
  return (
    <button className="monitor-button first-type" onClick={() => props.openDialogAddFran()}>
      <span>Добавить франчайзи</span>
    </button>
  );
};

export default AddFran;
