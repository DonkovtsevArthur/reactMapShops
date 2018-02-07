interface IndexLineProps {
  index: string;
  indexAction: string;
}

export function getTitleParamFromConfig(props: IndexLineProps) {
  if (props.index || props.indexAction) {
    if (props.index === 'closeResultSum' && props.indexAction === 'sum' || props.indexAction === '') {
      return { title: 'Выручка', name: 'proceeds', measure: 'currency' };
    }
    if (props.index === 'documentUuid' && props.indexAction === 'count') {
      return { title: 'Чеков', name: 'receipts', measure: 'pcs' };
    }
    if (props.index === 'closeResultSum' && props.indexAction === 'avg') {
      return { title: 'Средний чек', name: 'avgReceipt', measure: 'currency' };
    }
    if (props.index === 'totalQuantity' && props.indexAction === 'sum' || props.indexAction === '') {
      return { title: 'Всего позиций', name: 'position', measure: 'pcs' };
    }
    if (props.index === 'totalQuantity' && props.indexAction === 'avg') {
      return { title: 'Позиций в чеке', name: 'positionInReceipt', measure: 'pcs' };
    }
    if (props.index === 'taxResultSum' && props.indexAction === 'sum') {
      return { title: 'Выручка', name: 'goodProceeds', measure: 'currency' };
    }
  }
  return {  title: '', name: '', measure: 'pcs' };
}
