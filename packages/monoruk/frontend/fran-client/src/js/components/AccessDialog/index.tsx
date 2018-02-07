import * as React from 'react';
import * as UI from 'material-ui';

interface Props {
  visible: boolean;
  accessToken: string;
  close: () => void;
}

class AccessDialog extends React.Component<Props> {
  render() {
    const actions = [
      <UI.FlatButton
        label="Закрыть"
        primary
        onClick={this.props.close}
        key="3"
      />
    ];
    return (
      <UI.Dialog
        title="Ваш токен"
        actions={actions}
        modal={false}
        open={this.props.visible}
        onRequestClose={this.props.close}
      >
        <p>{this.props.accessToken}</p>
      </UI.Dialog>
    );
  }
}

export default AccessDialog;
