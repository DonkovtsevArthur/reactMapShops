import * as React from 'react';
import * as Moment from 'moment';
import * as numeral from 'numeral';
import UI from '../../../../../ui-elements/src';

numeral.locale('ru');

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
  VictoryGroup
} from 'victory';
import { GraphData } from '../../reducers/widgets';

export interface LineProps {
  graphData: GraphData[];
  period: string;
  measure: string;
}

function getTickFormat(period: string, time: string) {
  switch (period) {
    case 'today':
      return Moment(time, 'HH').format('HH:00');
    case 'yesterday':
      return Moment(time, 'HH').format('HH:00');
    case '7days':
      return Moment(time, 'YYYY-MM-DD').format('DD.MM');
    case '30days':
      return Moment(time, 'YYYY-MM-DD').format('DD.MM');
    case 'year':
      return Moment(time, 'MM.YYYY').format('MM.YYYY');
    default:
      return Moment(time, 'HH').format('HH:00');
  }
}

function getDays(duration: number) {
  const days = [];
  for (let i = 0; i < duration; i++) {
    days.unshift(
      Moment()
        .add(-i, 'd')
        .format('YYYY-MM-DD')
    );
  }
  return days;
}

function getMonth(duration: number) {
  const months = [];
  for (let i = 0; i < duration; i++) {
    months.unshift(
      Moment()
        .add(-i, 'month')
        .format('M.YYYY')
    );
  }
  return months;
}

function getHours() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  return hours;
}

function merge(local: string[], data: GraphData[]) {
  return local.map(item => {
    const result = data.filter(point => point.x === item);
    if (result && result.length > 0) {
      return { x: item, y: result[0].y, y1: result[0].y1, width: 15 };
    }
    return { x: item, y: 0, y1: 0, width: 15 };
  });
}

function getYTick(period: string) {
  switch (period) {
    case 'today':
    case 'yesterday':
      return getHours();
    case '7days':
      return getDays(7);
    case '30days':
      return getDays(30);
    case 'year':
      return getMonth(12);
    default:
      return [];
  }
}

const Line: React.StatelessComponent<LineProps> = props => {
  const data = merge(getYTick(props.period), props.graphData);
  const dataPrev = data.map(item => ({ ...item, width: 3 }));
  const showGraph = props.graphData && props.graphData.length > 0;
  const graph = (
    <VictoryChart
      domainPadding={{ x: 15, y: 20 }}
      width={1000}
      height={300}
      padding={{ bottom: 25, top: 25, left: 70, right: 10 }}
    >
      <VictoryAxis
        fixLabelOverlap
        tickValues={data.map(item => item.x)}
        tickFormat={x => getTickFormat(props.period, x)}
        style={{
          axis: { stroke: 'rgba(230, 227, 232, 0.5)', width: '1px' },
          grid: { stroke: 'transparent' },
          tickLabels: {
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: '600',
            fontSize: '11px',
            lineHeight: '15px',
            fill: '#B8B2C2'
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={y => numeral(y).format('0.[0]a')}
        style={{
          axis: { stroke: 'transparent', width: '1px' },
          grid: { stroke: 'rgba(230, 227, 232, 0.5)', width: '1px' },
          tickLabels: {
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: '600',
            fontSize: '11px',
            lineHeight: '15px',
            fill: '#B8B2C2'
          }
        }}
      />
      <VictoryGroup colorScale="qualitative">
        <VictoryBar
          data={data}
          y="y"
          x="x"
          labels={d =>
            props.measure === 'pcs'
              ? numeral(d.y).format('0,00[.]00')
              : numeral(d.y).format('0,0[.]00$')
          }
          labelComponent={
            <VictoryTooltip
              style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: '600',
                fontSize: '11px',
                fill: '#B8B2C2',
                borderColor: '#B8B2C2',
                backgroundColor: 'white'
              }}
            />
          }
          style={{ data: { fill: '#A6B6FB' } }}
        />
        <VictoryBar
          data={dataPrev}
          y="y1"
          x="x"
          labels={d =>
            props.measure === 'pcs'
              ? numeral(d.y1).format('0,00[.]00')
              : numeral(d.y1).format('0,0[.]00$')
          }
          labelComponent={<VictoryTooltip />}
          //cornerRadius={2}
          style={{ data: { fill: '#4d6df7' } }}
          animate={{
            duration: 500,
            onLoad: { duration: 500 }
          }}
        />
      </VictoryGroup>
    </VictoryChart>
  );
  const empty = (
    <div className="graph__empty">
      <p>Нет данных</p>
    </div>
  );
  return showGraph ? graph : empty;
};

export default Line;
