import * as React from 'react';
import UI from '../../index';
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
  <UI.ElementWindow>
      <UI.Title text={props.title} />
      <UI.HorizontalContainer>
        <UI.VerticalContainer>
          {
            props.graphData.map((element, i, arr) => (
              <UI.ListElement
                key={i}
                index={i + 1}
                name={element.x}
                color={props.colors[i]}
                value={numeral(element.y as number).format('0,0[.]00') as string}
                currency={props.currency}
                last={arr.length === (i + 1) && props.last ? true : false}
              />
            ))
          }
        </UI.VerticalContainer>
        <UI.Pie
          data={props.graphData}
          colors={props.colors}
          width={300}
          height={300}
          innerRadius={93}
          padAngle={3}
          cornerRadius={10}
        >
          <UI.BestTitle
            name={props.graphData[0].x as string}
            value={numeral(props.graphData[0].y as number).format('0,0[.]00')}
            currency={props.currency}
          />
        </UI.Pie>
      </UI.HorizontalContainer>
    </UI.ElementWindow>
);

export default PieGraphAndList;
