import * as React from 'react';
import * as UI from 'material-ui';

interface Props {
  share(): void;
}

const EmptyAccessTokens: React.StatelessComponent<Props> = props => (
  <div className="access">
    <p>Нет токенов доступа</p>
    <UI.RaisedButton label="Создать токен" primary={true} onClick={props.share} />
  </div>
);

export default EmptyAccessTokens;
