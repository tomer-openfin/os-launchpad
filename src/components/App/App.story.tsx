import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { setIsDrawerExpanded } from '../../redux/application';
import { setLauncherPosition, setLauncherSize, setSystemTrayEnabled } from '../../redux/me';
import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import { getCollapsedSystemDrawerSize } from '../../redux/selectors';
import App from './App';

storiesOf(`${CATEGORIES.COMPONENTS}App`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    window.store.dispatch(setLauncherSize({ launcherSize }));
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    window.store.dispatch(setLauncherPosition({ launcherPosition }));
    const isDrawerExpanded = boolean('isDrawerExpanded', false);
    window.store.dispatch(setIsDrawerExpanded(isDrawerExpanded));
    const hasSystemTrayEnabled = boolean('hasSystemTrayEnabled', false);
    window.store.dispatch(setSystemTrayEnabled({ systemTrayEnabled: hasSystemTrayEnabled }));

    const launcherSizeConfig = launcherSizeConfigs[launcherSize];

    return (
      <App
        collapsedSystemDrawerSize={getCollapsedSystemDrawerSize(window.store.getState())}
        hasSystemTrayEnabled={hasSystemTrayEnabled}
        isDrawerExpanded={isDrawerExpanded}
        launcherPosition={launcherPosition}
        launcherSizeConfig={launcherSizeConfig}
        toggleDrawer={noop}
      />
    );
  });
