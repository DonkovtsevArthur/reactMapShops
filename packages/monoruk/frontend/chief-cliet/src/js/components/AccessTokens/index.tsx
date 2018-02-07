import * as React from 'react';
import * as UI from 'material-ui';
import { IntegrationStore } from '../../reducers/integration';
import { IntegrationActionsCreators } from '../../actions/integration';
import EmptyAccessTokens from '../EmptyAccessTokens';
import TokenLine from '../TokenLine';

type Props = IntegrationStore & IntegrationActionsCreators;

const AccessTokens: React.StatelessComponent<Props> = props => {
  if (!props.tokens || props.tokens.length === 0) {
    return <EmptyAccessTokens share={props.share} />;
  }
  return (
    <div>
      {props.tokens.map(token => (
        <TokenLine
          key={token.accessToken}
          {...token}
          on={props.on}
          off={props.off}
          remove={props.remove}
        />
      ))}
      <div className="access__share">
        <UI.RaisedButton label="Создать токен" primary={true} onClick={props.share} />
      </div>
    </div>
  );
};

export default AccessTokens;
