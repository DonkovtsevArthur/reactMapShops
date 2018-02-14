import * as React from 'react';
import * as numeral from 'numeral';
import { GraphData, WidgetConfig } from '../../reducers/widgets';

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
  period: string;
  widgetConfig: WidgetConfig;
}

function getLabel(label: string, index?: string, indexAction?: string) {
  if (index || indexAction) {
    if (index === 'closeResultSum' && indexAction === 'sum') {
      return { title: 'Выручка', measure: 'currency' };
    }
    if (index === 'documentUuid' && indexAction === 'count') {
      return { title: 'Чеков', measure: '' };
    }
    if (index === 'closeResultSum' && indexAction === 'avg') {
      return { title: 'Средний чек', measure: 'currency' };
    }
    if (index === 'totalQuantity' && indexAction === 'sum') {
      return { title: 'Всего товаров', measure: '' };
    }
    if (index === 'totalQuantity' && indexAction === 'avg') {
      return { title: 'Товаров в чеке', measure: '' };
    }
  }
  return label === 'CASH'
    ? { title: 'Наличные', measure: 'currency' }
    : { title: 'Безналичные', measure: 'currency' };
}

class Count extends React.Component<LineProps, {}> {
  constructor(props: LineProps) {
    super(props);
    this.getGraph = this.getGraph.bind(this);
    this.showGraph = this.showGraph.bind(this);
  }
  getGraph() {
    return this.props.graphData.map((data, i) => {
      const prev = ((data.x as number) - data.x1) / ((data.x as number) + data.x1) * 100;
      if (data.y === '') {
        return null;
      }
      return (
        <div className="widget-counter" key={i}>
          <div className="widget-counter__text">
            <div className="widget-counter__title">
              {data.y
                ? getLabel(data.y as string).title
                : getLabel('', this.props.widgetConfig.index, this.props.widgetConfig.indexAction).title}
            </div>
            <div className="widget-counter__value">
              <p
                style={{
                  fontSize: data.x && data.x.toString().length >= 7 ? '0.9em' : 'inherite'
                }}
              >
                {getLabel('', this.props.widgetConfig.index, this.props.widgetConfig.indexAction).measure ===
                'currency'
                  ? numeral(data.x).format('0,0[.]00')
                  : numeral(data.x).format('0,0[.]00')}
                {getLabel('', this.props.widgetConfig.index, this.props.widgetConfig.indexAction).measure ===
                'currency' ? (
                  <i className="fa fa-ruble" />
                ) : null}
              </p>
              <span className={prev > 0 ? 'plus' : 'minus'}>{prev.toFixed(1) + '%'}</span>
            </div>
          </div>
        </div>
      );
    });
  }
  showGraph() {
    return this.props.graphData && this.props.graphData.length > 0;
  }
  render() {
    return (
      this.showGraph() ? this.getGraph() : <div />
    );
  }
}

export default Count;

// data.x + getLabel('', props.widgetConfig.index, props.widgetConfig.indexAction).measure
