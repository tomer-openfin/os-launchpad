import * as React from 'react';

import { storiesOf } from '@storybook/react';

import AppData from '../../const/AppData';
import { noopCreator } from '../../utils/noop';

import AppList from './AppList';

storiesOf('Components/AppList', module).add('default', () => (
  <AppList removeFromLauncher={noopCreator} launcherPosition="TOP" appList={AppData} launchWindowCreator={noopCreator} spaceCount={4} />
));
