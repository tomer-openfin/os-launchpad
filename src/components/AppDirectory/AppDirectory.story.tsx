import * as React from 'react';

import { storiesOf } from '@storybook/react';

import appData from '../../const/AppData';

import AppDirectory from './AppDirectory';

storiesOf('AppDirectory', module).add('default', () =>
  <AppDirectory appList={appData} />,
);
