import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../../store';
import { noopCreator } from '../../utils/noop';

import App from './App';

storiesOf('App', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <App launchWindowCreator={noopCreator} />);
