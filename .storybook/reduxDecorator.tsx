import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../src/store';

const reduxDecorator = story => <Provider store={store}>{story()}</Provider>;

export default reduxDecorator;
