import * as React from 'react';
import * as UI from 'material-ui';

interface Props {
  label: string;
  checked: boolean;
  checkProps: () => void;
}

const CheckerWindgetIndex: React.StatelessComponent<Props> = (props) => {
  return (
    <div className="checker">
      <UI.Checkbox
        label={props.label}
        checked={props.checked}
        style={{
          width: '230px'
        }}
        onClick={props.checkProps}
      />
    </div>
  );
};

export default CheckerWindgetIndex;
