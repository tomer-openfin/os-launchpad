import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../const/AppData';
import { LauncherPosition } from '../../types/commons';
import { getLauncherIcons } from '../../utils/getLauncherIcons';

import App from './App';

const MOCK_ICONS = getLauncherIcons(false).map(icon => ({
  cta: action('Action to be dispatched:', icon.action),
  icon: icon.icon,
  key: icon.key,
}));

storiesOf('Components/App', module).add('default', () => {
  return <App apps={AppData} launcherPosition={LauncherPosition.Top} icons={MOCK_ICONS} />;
});
