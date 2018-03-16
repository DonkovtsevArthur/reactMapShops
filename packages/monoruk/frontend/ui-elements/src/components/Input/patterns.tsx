export interface IParams {
  value: string;
  length: number;
  currentLength: number;
  lastSymbol: string;
}

export const patternNumber = (params: IParams) => {
  const { value, lastSymbol } = params;
  return value !== ' ' &&
    value.substring(value.length - 2) !== '  ' &&
    Number.isInteger(+lastSymbol)
    ? value
    : null;
};

export const patternLetter = (params: IParams) => {
  const { value, lastSymbol, currentLength } = params;
  return lastSymbol.match('[A-zА-я]{1}') ||
    (lastSymbol === ' ' && value.substring(value.length - 2) !== '  ' && currentLength)
    ? value
    : null;
};

export const patternPhone = (params: IParams) => {
  const { value, length, currentLength, lastSymbol } = params;
  if (!Number.isInteger(+lastSymbol) || length > 14) return null;
  if (length === 1) {
    return +lastSymbol === 8 ? value + ' ' : '8 ' + value;
  }
  if (currentLength < length && (length === 5 || length === 9)) {
    return `${value} `;
  } else {
    return value;
  }
};

export const patternInn = (params: IParams) => {
  const { value, length, currentLength, lastSymbol } = params;
  if (!Number.isInteger(+lastSymbol) || length > 13) return null;
  if (currentLength < length && (length === 4 || length === 9)) {
    return `${value} `;
  } else {
    return value;
  }
};
