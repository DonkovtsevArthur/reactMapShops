import * as React from 'react';
import * as numeral from 'numeral';
import { VictoryBar, VictoryGroup, VictoryChart, VictoryAxis } from 'victory';
import { VictoryTooltip } from 'victory-core';
import * as R from 'ramda';
import ElementWindow from '../ElementWindow';
import Title from '../Title';

interface GraphData {
  x: string;
  y: number;
  y1: number;
}

interface BarProps {
  graphData: GraphData[];
  title: string;
  currency: boolean;
}

declare module 'victory' {
  export interface VictoryAxisProps {
    fixLabelOverlap?: boolean;
  }
}

function getMax(elements: GraphData[]) {
  const reduce = (acc: number, element: number) => R.max(acc, element);
  const mapped = (item: GraphData) => R.max(item.y, item.y1);
  return R.reduce(reduce, 0, R.map(mapped, elements));
}

const Bar: React.StatelessComponent<BarProps> = props => (
  <ElementWindow>
    <Title text={props.title} />
    <VictoryChart
      domainPadding={{ x: 15, y: 20 }}
      width={1000}
      height={300}
      padding={{ bottom: 25, top: 25, left: 70, right: 10 }}
    >
      <VictoryAxis
        fixLabelOverlap
        tickValues={props.graphData.map(item => item.x)}
        // tickFormat={x => getTickFormat(this.props.period, x)}
        style={{
          axis: { stroke: 'rgba(230, 227, 232, 0.5)', width: '1px' },
          grid: { stroke: 'transparent' },
          tickLabels: {
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 600,
            fontSize: '11px',
            lineHeight: '15px',
            fill: '#B8B2C2'
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={y => numeral(y).format('0.[0]a')}
        domain={[0, props.graphData && getMax(props.graphData)]}
        style={{
          axis: { stroke: 'transparent', width: '1px' },
          grid: { stroke: 'rgba(230, 227, 232, 0.5)', width: '1px' },
          tickLabels: {
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 600,
            fontSize: '11px',
            lineHeight: '15px',
            fill: '#B8B2C2'
          }
        }}
      />
      <VictoryGroup colorScale="qualitative">
        <VictoryBar
          data={props.graphData}
          y="y"
          x="x"
          labels={d =>
            props.currency ? numeral(d.y).format('0,00[.]00$') : numeral(d.y).format('0,0[.]00')
          }
          labelComponent={
            <VictoryTooltip
              style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: '600',
                fontSize: '11px',
                fill: '#B8B2C2'
              }}
            />
          }
          style={{ data: { fill: '#4d6df7' } }}
          animate={{
            duration: 500,
            onLoad: { duration: 500 }
          }}
        />
        <VictoryBar
          data={props.graphData.map(item => ({ ...item, width: 3 }))}
          y="y1"
          x="x"
          labels={d =>
            props.currency ? numeral(d.y1).format('0,00[.]00$') : numeral(d.y1).format('0,0[.]00')
          }
          labelComponent={
            <VictoryTooltip
              style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: '600',
                fontSize: '11px',
                fill: '#B8B2C2'
              }}
            />
          }
          style={{ data: { fill: '#A6B6FB' } }}
          animate={{
            duration: 500,
            onLoad: { duration: 500 }
          }}
        />
      </VictoryGroup>
    </VictoryChart>
  </ElementWindow>
);

export default Bar;
