import * as React from 'react';

export const withMarginDecorator = (margin: string | number = 30) => story => (
  <div style={{ margin: `${typeof margin === 'string' ? margin : `${margin}px`}` }}>{story()}</div>
);

export const getNumberOrStringFromText = (textValue: string) => (Number.isNaN(Number(textValue)) ? textValue : Number(textValue));
