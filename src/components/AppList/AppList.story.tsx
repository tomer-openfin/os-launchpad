import * as React from 'react';

import { storiesOf } from '@storybook/react';

import AppData from '../../redux/apps/AppData';
import { noopCreator } from '../../utils/noop';

import AppList from './AppList';

storiesOf('AppList', module).add('default', () => <AppList appList={AppData} launchWindowCreator={noopCreator} />);
