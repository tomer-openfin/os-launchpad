import * as React from 'react';

export const withMarginDecoractor = (margin: string | number) => story => (
  <div style={{ margin: `${typeof margin === 'string' ? margin : `${margin}px`}` }}>{story()}</div>
);