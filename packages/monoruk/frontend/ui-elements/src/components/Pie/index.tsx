import * as React from 'react';

import { VictoryContainer, VictoryPie } from 'victory';

export interface Data {
  x: string;
  y: number;
}

export interface PieProps {
  colors: string[];
  data: Data[];
  width: number;
  height: number;
  innerRadius: number;
  padAngle: number;
  cornerRadius: number;
  currency?: boolean;
}

const Pie: React.StatelessComponent<PieProps> = props => (
  <div className="ui-elements-pie">
    {props.children}
    <VictoryContainer
      width={props.width}
      height={props.height}
      style={{
        width: '100%',
        height: 'auto'
      }}
    >
      <VictoryPie
        data={props.data}
        colorScale={props.colors}
        width={props.width}
        height={props.height}
        innerRadius={props.innerRadius}
        padAngle={props.padAngle}
        cornerRadius={props.cornerRadius}
        standalone={false}
        labels={d => ''}
        animate={{
          duration: 500,
          onLoad: { duration: 500 }
        }}
      />
    </VictoryContainer>
  </div>
);

export default Pie;
