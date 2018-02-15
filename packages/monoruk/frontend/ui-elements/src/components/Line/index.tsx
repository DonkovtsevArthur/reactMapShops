import * as React from 'react';
import * as numeral from 'numeral';
import { VictoryArea, VictoryChart, VictoryAxis, VictoryTheme, VictoryScatter } from 'victory';
import { VictoryTooltip } from 'victory-core';
import * as R from 'ramda';
import ElementWindow from '../ElementWindow';
import Title from '../Title';

interface GraphData {
  x: string;
  y: number;
  y1: number;
}

interface LineProps {
  graphData: GraphData[];
  title: string;
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

const Line: React.StatelessComponent<LineProps> = props => (
  <ElementWindow>
    <Title text={props.title} />
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 10 }}
      width={1000}
      height={300}
      padding={{ bottom: 25, top: 25, left: 70, right: 10 }}
    >
      <VictoryAxis
        fixLabelOverlap
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
        fixLabelOverlap
        dependentAxis
        tickFormat={y => numeral(y).format('0.[0]a')}
        padding={{ top: 20, bottom: 60, left: 20 }}
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
      <VictoryArea
        data={props.graphData}
        y="y1"
        style={{
          data: {
            fill: '#A6B6FB',
            stroke: '#A6B6FB',
            opacity: 0.8
          }
        }}
        animate={{
          duration: 500,
          onLoad: { duration: 500 }
        }}
      />
      <VictoryArea
        data={props.graphData}
        style={{
          data: {
            fill: '#4d6df7',
            stroke: '#4d6df7',
            opacity: 0.8
          }
        }}
        animate={{
          duration: 500,
          onLoad: { duration: 500 }
        }}
      />
      <VictoryScatter
        data={props.graphData}
        size={3}
        y="y"
        x="x"
        labels={d => `${d.x}: ${numeral(d.y).format('0,0[.]00$')}`}
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
        style={{
          data: {
            fill: '#4d6df7',
            opacity: 0.8
          }
        }}
      />
      <VictoryScatter
        data={props.graphData}
        size={3}
        y="y1"
        x="x"
        labels={d => `${d.x}: ${numeral(d.y1).format('0,0[.]00$')}`}
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
        style={{
          data: {
            fill: '#A6B6FB'
          }
        }}
      />
    </VictoryChart>
  </ElementWindow>
);

export default Line;
