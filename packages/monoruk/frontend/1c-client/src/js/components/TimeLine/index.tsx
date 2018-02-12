import * as React from 'react';
import * as UI from 'material-ui';
import './timeline.scss';

interface TimeLineProps {
  period: string;
  appId: string;
  updateWidget(id: string, config: { period: string }): void;
}

const TimeLine: React.StatelessComponent<TimeLineProps> = props => (
  <div className="timeline">
    <UI.FlatButton
      label="Месяц"
      primary={props.period === 'month' ? false : true}
      secondary={props.period === 'month' ? true : false}
      onClick={() => props.updateWidget(props.appId, { period: 'month' })}
    />
    <UI.FlatButton
      label="Квартал"
      primary={props.period === 'quarter' ? false : true}
      secondary={props.period === 'quarter' ? true : false}
      onClick={() => props.updateWidget(props.appId, { period: 'quarter' })}
    />
    <UI.FlatButton
      label="Полгода"
      primary={props.period === 'half-year' ? false : true}
      secondary={props.period === 'half-year' ? true : false}
      onClick={() => props.updateWidget(props.appId, { period: 'half-year' })}
    />
    <UI.FlatButton
      label="Год"
      primary={props.period === 'year' ? false : true}
      secondary={props.period === 'year' ? true : false}
      onClick={() => props.updateWidget(props.appId, { period: 'year' })}
    />
  </div>
);

export default TimeLine;
