import * as React from 'react';

import { storiesOf } from '@storybook/react';

import AppData from '../../const/AppData';
import noop, { noopCreator } from '../../utils/noop';

import AppDirectory from './AppDirectory';

const getIsLauncherApp = () => false;

storiesOf('Components/AppDirectory', module).add('default', () => (
  <AppDirectory
    addToLauncher={noopCreator}
    appList={AppData}
    getIsLauncherApp={getIsLauncherApp}
    onBlur={noop}
    onEscDown={noop}
    removeFromLauncher={noopCreator}
  />),
);
