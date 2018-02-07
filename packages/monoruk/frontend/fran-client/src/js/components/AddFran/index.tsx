import * as React from "react";
import * as UI from "material-ui";

interface Props {
  openDialogAddFran(): void;
}

const AddFran: React.StatelessComponent<Props> = props => {
  return (
    <button
      className="monitor-button first-type"
      onClick={() => props.openDialogAddFran()}
    >
      <span>Добавить франчайзи</span>
    </button>
  );
};

export default AddFran;
