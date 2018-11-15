import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { LauncherPosition } from '../../redux/me/types';
import noop from '../../utils/noop';

import App from './App';

storiesOf('Components/App', module)
  .add('default', () => (
    <App
      launcherPosition={LauncherPosition.Top}
      launchWindow={noop}
    />
  ));
