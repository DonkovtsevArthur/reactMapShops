import * as React from 'react';
import * as UI from 'material-ui';

interface Props {
  accessToken: string;
  active: boolean;
  on: (token: string) => void;
  off: (token: string) => void;
  remove: (token: string) => void;
}

const TokenLine: React.StatelessComponent<Props> = (props) => (
  <div className="access">
    <p>{props.accessToken}</p>
    <span className="access__controls">
      <UI.Toggle
        label="Вкл/Выкл"
        labelPosition="right"
        toggled={props.active}
        onClick={() => { props.active ? props.off(props.accessToken) : props.on(props.accessToken); }}
      />
      <UI.FlatButton
        label="Удалить"
        secondary={true}
        onClick={() => props.remove(props.accessToken)}
      />
    </span>
  </div>
);

export default TokenLine;
