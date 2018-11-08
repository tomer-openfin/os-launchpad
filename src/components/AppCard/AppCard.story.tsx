import * as React from 'react';

import { storiesOf } from '@storybook/react';

import AppData from '../../const/AppData';
import { noopCreator } from '../../utils/noop';

import AppCard from './index';

storiesOf('AppCard', module).add('default', () => (
  <AppCard
    addToLauncher={noopCreator}
    app={AppData[0]}
    isLauncherApp={false}
    removeFromLauncher={noopCreator}
  />
  ),
);
