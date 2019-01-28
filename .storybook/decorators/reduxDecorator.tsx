import * as React from 'react';
import { Provider } from 'react-redux';

const reduxDecorator = store => story => {
  window.store = store;

  return <Provider store={store}>{story()}</Provider>;
};

export default reduxDecorator;
