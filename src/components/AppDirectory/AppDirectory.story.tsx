import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import noop, { noopCreator } from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import AppDirectory from './AppDirectory';

const getIsLauncherApp = () => false;

storiesOf(`${CATEGORIES.COMPONENTS}AppDirectory`, module).add('default', () => (
  <AppDirectory
    addToLauncher={noopCreator}
    appList={AppData}
    getIsLauncherApp={getIsLauncherApp}
    hideWindow={noop}
    onBlur={noop}
    onEscDown={noop}
    removeFromLauncher={noopCreator}
  />
));
