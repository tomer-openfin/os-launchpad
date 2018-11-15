import * as React from 'react';

import { storiesOf } from '@storybook/react';

import AppData from '../../const/AppData';
import { LauncherPosition } from '../../redux/me/types';
import { noopCreator } from '../../utils/noop';

import AppList from './AppList';

storiesOf('Components/AppList', module)
  .add('default', () => (
    <AppList
      appList={AppData}
      launcherPosition={LauncherPosition.Top}
      launchWindowCreator={noopCreator}
      removeFromLauncher={noopCreator}
      spaceCount={4}
    />
  ));
