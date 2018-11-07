import * as React from 'react';

import { storiesOf } from '@storybook/react';

import appData from '../../const/AppData';
import noop from '../../utils/noop';

import AppDirectory from './AppDirectory';

storiesOf('AppDirectory', module).add('default', () =>
  <AppDirectory addToLauncher={noop} appList={appData} launcherAppIds={['12', '6', '7']} removeFromLauncher={noop} />,
);
