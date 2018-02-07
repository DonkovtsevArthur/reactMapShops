import * as React from 'react';
import * as UI from 'material-ui';

interface Props {
  visible: boolean;
  accessToken: string;
  alias: string;
  addFran: (accessToken: string, alias: string) => void;
  changeAccessToken: (accessToken: string) => void;
  changeAlias: (alias: string) => void;
  close: () => void;
}

class AddFranDialog extends React.Component<Props> {
  constructor() {
    super();
    this.handleAddFran = this.handleAddFran.bind(this);
    this.handleChangeAccessToken = this.handleChangeAccessToken.bind(this);
    this.handleChangeAlias = this.handleChangeAlias.bind(this);
  }
  handleAddFran() {
    this.props.addFran(this.props.accessToken, this.props.alias);
  }
  handleChangeAccessToken(e: React.FormEvent<{}>, accessToken: string) {
    this.props.changeAccessToken(accessToken);
  }
  handleChangeAlias(e: React.FormEvent<{}>, alias: string) {
    this.props.changeAlias(alias);
  }
  render() {
    const actions = [
      <UI.FlatButton
        label="Отмена"
        primary
        onClick={this.props.close}
        key="3"
      />,
      <UI.FlatButton
        label="Добавить"
        primary
        onClick={this.handleAddFran}
        key="4"
      />
    ];
    return (
      <UI.Dialog
        title="Добавить точку"
        actions={actions}
        modal={false}
        open={this.props.visible}
        onRequestClose={this.props.close}
      >
        <UI.TextField
          hintText="Название"
          floatingLabelText="Название"
          onChange={this.handleChangeAlias}
          fullWidth
          value={this.props.alias}
        />
        <UI.TextField
          hintText="Токен"
          floatingLabelText="Токен"
          onChange={this.handleChangeAccessToken}
          fullWidth
          value={this.props.accessToken}
        />
      </UI.Dialog>
    );
  }
}

export default AddFranDialog;
