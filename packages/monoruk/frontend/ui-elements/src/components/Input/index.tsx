import * as React from "react";
import {
  patternPhone,
  patternInn,
  patternNumber,
  patternLetter
} from "./patterns";
import "./input.scss";

export interface InputProps {
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  className?: string;
  value?: string;
  type?: string;
  settings?: string;
  onChange?: (event: object) => string;
}

class Input extends React.Component<InputProps> {
  state = {
    value: "",
    className: ""
  };

  public render() {
    const { pattern, value: propValue, ...props } = this.props;
    const { value: stateValue } = this.state;
    const className =
      (props.className ? props.className + " " : "") + this.state.className;

    return (
      <input
        {...props}
        value={typeof propValue !== "undefined" ? propValue : stateValue}
        className={`LAD-input ${className}`}
        onChange={this.handleChange}
        onBlur={this.handleFocusOut}
      />
    );
  }

  handleChange = event => {
    event.preventDefault();
    const { settings } = this.props;
    const { value: currentValue } = this.state;
    const currentLength = currentValue.length;
    const { value } = event.target;
    const length = value.length;
    const lastSymbol = value.substring(value.length - 1);
    const params = { value, length, currentLength, lastSymbol };
    // const settings = JSON.parse(event.target.getAttribute("data-settings"));

    switch (settings) {
      case "isPhone": {
        const data = patternPhone(params);
        if (!Object.is(data, null)) this.setState({ value: data });
        return;
      }

      case "isInn": {
        const data = patternInn(params);
        if (!Object.is(data, null)) this.setState({ value: data });
        return;
      }

      case "isNumbers": {
        const data = patternNumber(params);
        if (!Object.is(data, null)) this.setState({ value: data });
        return;
      }

      case "isLetter": {
        const data = patternLetter(params);
        if (!Object.is(data, null)) this.setState({ value: data });
        return;
      }

      default: {
        break;
      }
    }
    this.setState({ value });
    // if (typeof onChange === "function") onChange(event);
  };

  handleFocusOut = event => {
    const { value } = this.state;
    const { pattern } = this.props;

    if (value === "") {
      this.setState({ className: "empty" });
      return;
    }

    if (pattern) {
      if (value.match(pattern)) this.setState({ className: "valid" });
      else this.setState({ className: "invalid" });
      return;
    }

    this.setState({ className: "valid" });
  };
}

export default Input;
