import * as React from 'react';
import Select from 'react-select';
import { getTitleParamFromConfig } from '../../helper';

interface IndexLineProps {
  index: string;
  indexAction: string;
}

interface Props extends IndexLineProps {
  updateIndexDynamicWidgets(index: string, indexAction: string): void;
}

interface ButtonData {
  value: string;
  label: string;
  val1: string;
  val2: string;
}

class IndexLine extends React.Component<Props, {}> {
  state = {
    selectedItem: {
      label: getTitleParamFromConfig({
        index: this.props.index,
        indexAction: this.props.indexAction
      }).title,
      val1: this.props.index,
      val2: this.props.indexAction,
      value: getTitleParamFromConfig({
        index: this.props.index,
        indexAction: this.props.indexAction
      }).name
    },
    selectOptions: getSelectOptions()
  };
  render() {
    const { updateIndexDynamicWidgets } = this.props;
    const { selectedItem, selectOptions } = this.state;

    const handleChangeSelect = (item: { val1: string; val2: string }) => {
      const { val1, val2 } = item;
      this.setState({ selectedItem: item });
      updateIndexDynamicWidgets(val1, val2);
    };

    return (
      <div className="widget-select-filter">
        <Select
          name="form-field-name"
          value={selectedItem.value}
          placeholder={selectedItem.label}
          onChange={handleChangeSelect}
          options={selectOptions}
        />
      </div>
    );
  }
}

function getSelectOptions() {
  const dateDataArr = [
    ['Выручка', 'proceeds', 'closeResultSum', 'sum'],
    ['Чеков', 'receipts', 'documentUuid', 'count'],
    ['Средний чек', 'avgReceipt', 'closeResultSum', 'avg'],
    ['Всего товаров', 'position', 'totalQuantity', 'sum'],
    ['Товаров в чеке', 'positionInReceipt', 'totalQuantity', 'avg']
  ];
  const selectOptions: ButtonData[] = [];
  dateDataArr.map(buttonData => {
    const [title, filter, val1, val2] = buttonData;
    // const titleParam = getTitleParamFromConfig(this.props).name;
    selectOptions.push({
      value: filter,
      label: title,
      val1,
      val2
    });
  });

  return selectOptions;
}

export default IndexLine;
