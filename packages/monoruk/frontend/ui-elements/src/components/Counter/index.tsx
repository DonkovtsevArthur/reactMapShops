import * as React from 'react';
import * as numeral from 'numeral';

export interface CounterProps {
  title: string;
  value: number;
  prev: number;
  currency: boolean;
  margin?: number;
  width?: number;
}

const Counter: React.StatelessComponent<CounterProps> = props => {
  const margin = props.margin ? `${props.margin}px` : null;
  const marginWidth = props.margin ? `${props.margin * 2}px` : null;
  const width = props.width ? { flex: `0 1 calc(${props.width}% - ${marginWidth})` } : null;
  return (
    <div
      className="ui-counter"
      style={{
        ...width,
        margin
      }}
    >
      <div className="text">
        <div className="title">{props.title}</div>
        <div className="value">
          <p
            style={{
              fontSize: props.value && props.value.toString().length >= 7 ? '0.9em' : 'inherite'
            }}
          >
            {numeral(props.value).format('0,0[.]00')}
            {props.currency ? <i className="fa fa-ruble" /> : null}
          </p>
          <span className={props.prev > 0 ? 'plus' : 'minus'}>{props.prev.toFixed(1) + '%'}</span>
        </div>
      </div>
    </div>
  );
};

export default Counter;
