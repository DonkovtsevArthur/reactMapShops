import * as React from 'react';

export interface CounterProps {
  title: string;
  value: string;
  prev: number;
}

const Counter: React.StatelessComponent<CounterProps> = props => (
  <div className="ui-counter">
    
  </div>
);

export default Counter;
