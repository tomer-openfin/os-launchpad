import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../../store';
import noop, { noopCreator } from '../../utils/noop';

import App from './App';

const bounds = {
  height: 0,
  left: 0,
  top: 0,
  width: 0,
};

storiesOf('App', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => (
    <App
      autoHide
      bounds={bounds}
      collapseApp={noop}
      expandApp={noop}
      isExpanded
      launcherPosition="TOP"
      launchWindowCreator={noopCreator}
      monitorInfo={{}}
      setMonitorInfo={noop}
    />
  ));
