import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { setLaunchbarPosition } from '../../redux/me';
import { DirectionalPosition } from '../../types/commons';
import { getSystemIcons } from '../../utils/getSystemIcons';
import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import { setIsDrawerExpanded } from '../../redux/application/index';
import App from './App';

storiesOf(`${CATEGORIES.COMPONENTS}App`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    window.store.dispatch(setLaunchbarPosition(launcherPosition));
    const isDrawerExpanded = boolean('isDrawerExpanded', false);
    window.store.dispatch(setIsDrawerExpanded(isDrawerExpanded));

    return <App isDrawerExpanded={isDrawerExpanded} toggleDrawer={noop} launcherPosition={launcherPosition} systemIcons={getSystemIcons(true)} />;
  });
