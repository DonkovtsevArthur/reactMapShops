import * as React from 'react';
import * as numeral from 'numeral';
import UI from 'monoruk-ui-elements';

import { COLORS } from '../../constants';

numeral.locale('ru');

interface PieData {
  x: string;
  y: number;
}

export interface LineProps {
  graphData: PieData[];
  section: string;
  measure: string;
  title: string;
}

const TableAndPie: React.StatelessComponent<LineProps> = props => {
  const showGraph = props.graphData && props.graphData.length > 0;
  const graph = () => (
    <UI.PieGraphAndList
      graphData={props.graphData}
      colors={COLORS}
      last={false}
      currency={true}
      title={props.title}
    />
  );
  const empty = (
    <div className="graph__empty">
      <p>Нет данных</p>
    </div>
  );
  return showGraph ? graph() : empty;
};

export default TableAndPie;
