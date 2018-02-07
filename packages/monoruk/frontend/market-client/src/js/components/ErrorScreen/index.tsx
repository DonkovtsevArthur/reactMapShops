import * as React from 'react';

export interface ErrorScreenProps {
  errorText: string;
}

const ErrorScreen: React.StatelessComponent<ErrorScreenProps> = (props) => (
  <div>
    <h3 className="error__header">{props.errorText}</h3>
  </div>
);

export default ErrorScreen;
