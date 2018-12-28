import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
import { getSystemIcons } from '../../utils/getSystemIcons';
import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import App from './App';

const MOCK_ICONS = getSystemIcons(true).map(icon => ({
  cta: action('Action to be dispatched:', icon.action),
  hasExtendedWindow: icon.hasExtendedWindow,
  icon: icon.icon,
  key: icon.key,
  shownCollapsed: icon.shownCollapsed,
}));

storiesOf(`${CATEGORIES.COMPONENTS}App`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherPosition = select('indicatorPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const isDrawerExpanded = boolean('isDrawerExpanded', false);

    return (
      <App isDrawerExpanded={isDrawerExpanded} toggleDrawer={noop} launcherPosition={launcherPosition} icons={MOCK_ICONS} systemIcons={getSystemIcons(true)} />
    );
  });
