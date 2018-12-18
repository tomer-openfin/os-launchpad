import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
import { getSystemIcons } from '../../utils/getSystemIcons';

import noop from '../../utils/noop';
import App from './App';

const MOCK_ICONS = getSystemIcons(true).map(icon => ({
  cta: action('Action to be dispatched:', icon.action),
  default: icon.default,
  hasExtendedWindow: icon.hasExtendedWindow,
  icon: icon.icon,
  key: icon.key,
}));

storiesOf('Components/App', module).add('default', () => {
  return <App isDrawerExpanded toggleDrawer={noop} launcherPosition={DirectionalPosition.Top} icons={MOCK_ICONS} systemIcons={getSystemIcons(true)} />;
});
