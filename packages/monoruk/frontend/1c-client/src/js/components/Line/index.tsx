import * as React from 'react';
import * as Moment from 'moment';
import * as numeral from 'numeral';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryScatter
} from 'victory';
import { GraphData } from '../../reducers/widgets';

export interface LineProps {
  graphData: GraphData[];
}

numeral.register('locale', 'ru', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'тыс.',
    million: 'млн.',
    billion: 'млрд.',
    trillion: 'трлн.'
  },
  ordinal() {
    return '.';
  },
  currency: {
    symbol: 'р.'
  }
});

numeral.locale('ru');

export interface LineProps {
  graphData: GraphData[];
}

const Line: React.StatelessComponent<LineProps> = (props) => {
  const showGraph = props.graphData && props.graphData.length > 0;
  const getMax = (data: GraphData[]) => {
    const y = data.map(item => item.y);
    return Math.max(...y);
  };
  const graph = (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 10 }}
      width={980}
      height={300}
      padding={{ bottom: 25, top: 25, left: 70, right: 10 }}
    >
      <VictoryAxis
        fixLabelOverlap
        tickFormat={x => Moment(x).format('DD.MM.YYYY')}
      />
      <VictoryAxis
        fixLabelOverlap
        dependentAxis
        // tickValues={props.graphData.map(item => item.y)}
        tickFormat={y => numeral(y).format('0.[0]a')}
        padding={{ top: 20, bottom: 60, left: 20 }}
        domain={[0, props.graphData && getMax(props.graphData)]}
      />
      <VictoryLine
        data={props.graphData}
        y="y"
        x="x"
      />
      <VictoryScatter
        data={props.graphData}
        size={3}
        y="y"
        x="x"
        labels={d => `${ Moment(d.x).format('DD.MM.YYYY')}: ${numeral(d.y).format('0,0[.]00$')}`}
        labelComponent={
          <VictoryTooltip
            style={{fontSize: 12, background: 'white'}}
          />
        }
      />
    </VictoryChart>
  );
  const empty = (
    <div className="graph__empty" >
      <p>Включите опцию "Хочу видеть данные в личном кабинете Эвотора" в Вашей обработке для 1С</p>
    </div>
  );
  return showGraph ? graph : empty;
};

export default Line;
