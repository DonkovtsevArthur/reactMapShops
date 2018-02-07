import * as React from 'react';
import * as numeral from 'numeral';
import * as elipsis from 'text-ellipsis';
import UI from '../../../../../ui-elements/src';

import { COLORS } from '../../constants';

numeral.locale('ru');

import { GraphData } from '../../reducers/widgets';

export interface LineProps {
  graphData: GraphData[];
  section: string;
  measure: string;
  title: string;
}

const TableAndPie: React.StatelessComponent<LineProps> = (props) => {
  console.info('data', props.graphData);
  console.info('true or false', props.graphData && props.graphData.length > 0);
  const showGraph = props.graphData && props.graphData.length > 0;
  const graph = () => (
    <UI.ElementWindow>
      <UI.Title text={props.title} />
      <UI.HorizontalContainer>
        <UI.VerticalContainer>
          {
            props.graphData.map((element, i, arr) => (
              <UI.ListElement
                key={i}
                index={i + 1}
                name={elipsis(element.x as string, 35)}
                color={COLORS[i]}
                value={numeral(element.y as number).format('0,0[.]00') as string}
                currency={props.measure === 'pcs' ? false : true}
                last={arr.length === (i + 1) ? true : false}
              />
            ))
          }
        </UI.VerticalContainer>
        <UI.Pie
          data={props.graphData}
          colors={COLORS}
          width={300}
          height={300}
          innerRadius={93}
          padAngle={3}
          cornerRadius={10}
        >
          <UI.BestTitle
            name={props.graphData[0].x as string}
            value={numeral(props.graphData[0].y as number).format('0,0[.]00')}
            currency={props.measure === 'pcs' ? false : true}
          />
        </UI.Pie>
      </UI.HorizontalContainer>
    </UI.ElementWindow>
  );
  const empty = (
    <div className="graph__empty" >
      <p>Нет данных</p>
    </div>
  );
  return showGraph ? graph() : empty;
};

export default TableAndPie;
