import * as React from 'react';
import * as UI from 'material-ui';
import * as copy from 'copy-to-clipboard';

export interface Props {
  appId: string;
}

const Integarion: React.StatelessComponent<Props> = props => (
  <div className="integration">
    <div className="integration__left">
      <p>Ваш токен</p>
      <span className="integration__question">
        <i className="fa fa-question-circle" />
      </span>
    </div>
    <div className="integration__right">
      <p>{props.appId}</p>
      <UI.FlatButton label="Копировать" primary={true} onClick={() => copy(props.appId)} />
    </div>
  </div>
);

export default Integarion;
