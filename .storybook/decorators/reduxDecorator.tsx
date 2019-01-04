import * as React from 'react';
import { Provider } from 'react-redux';

const reduxDecorator = store => story => {
  return <Provider store={store}>{story()}</Provider>;
};

export default reduxDecorator;
