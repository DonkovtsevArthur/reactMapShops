import * as React from 'react';
import TinyElementWindow from '../TinyElementWindow';

export interface InformationPanelProps {
  text: string;
  type: string;
  value: string;
  prev: string;
  less?: boolean;
  currency?: boolean;
  load?: boolean;
}

const InformationPanel: React.StatelessComponent<InformationPanelProps> = props => (
    <TinyElementWindow className="ui-informationPanel">
      <span className="text">{props.text}</span>
      <div className="right">
        <div className="value-main">
          <div className="top">
            <span className="type">{props.type}</span>
          </div>
          <div className="bottom">
            <span className="value">
              {props.load ? <i className="fa fa-cog fa-spin" /> : props.value}
              {props.currency ? <i className="fa fa-ruble" /> : null}
            </span>
            <span
              className="prev"
              style={{
                color: props.less ? '#EB5757' : '#4CB578'
              }}
            >
              {props.less ? `${props.prev}%` : `+${props.prev}%`}
            </span>
          </div>
        </div>
        {props.children}
      </div>
    </TinyElementWindow>
  );

export default InformationPanel;
