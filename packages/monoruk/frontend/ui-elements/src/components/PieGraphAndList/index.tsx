import * as React from 'react';
import ElementWindow from '../ElementWindow';
import Title from '../Title';
import HorizontalContainer from '../HorizontalContainer';
import VerticalContainer from '../VerticalContainer';
import Pie from '../Pie';
import BestTitle from '../BestTitle';
import ListElement from '../ListElement';

import * as numeral from 'numeral';

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

export interface GraphData {
  x: string;
  y: number;
}

export interface PieGraphAndList {
  title: string;
  graphData: GraphData[];
  colors: string[];
  currency: boolean;
  last: boolean;
}

const PieGraphAndList: React.StatelessComponent<PieGraphAndList> = props => (
  <ElementWindow>
    <Title text={props.title} />
    <HorizontalContainer className="container__pie">
      <VerticalContainer>
        {props.graphData.map((element, i, arr) => (
          <ListElement
            key={i}
            index={i + 1}
            name={element.x}
            color={props.colors[i]}
            value={numeral(element.y as number).format('0,0[.]00') as string}
            currency={props.currency}
            last={arr.length === i + 1 && props.last ? true : false}
          />
        ))}
      </VerticalContainer>
      <Pie
        data={props.graphData}
        colors={props.colors}
        width={300}
        height={300}
        innerRadius={93}
        padAngle={3}
        cornerRadius={10}
      >
        <BestTitle
          name={props.graphData[0].x as string}
          value={numeral(props.graphData[0].y as number).format('0,0[.]00')}
          currency={props.currency}
        />
      </Pie>
    </HorizontalContainer>
  </ElementWindow>
);

export default PieGraphAndList;
