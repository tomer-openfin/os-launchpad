import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { setLauncherPosition, setLauncherSize } from '../../redux/me';
import { getSystemDrawerSize } from '../../redux/selectors';
import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { CATEGORIES } from '../../utils/storyCategories';

import App from './App';

storiesOf(`${CATEGORIES.COMPONENTS}App`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    window.store.dispatch(setLauncherSize({ launcherSize }));
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    window.store.dispatch(setLauncherPosition({ launcherPosition }));

    const launcherSizeConfig = launcherSizeConfigs[launcherSize];

    return <App launcherPosition={launcherPosition} launcherSizeConfig={launcherSizeConfig} systemDrawerSize={getSystemDrawerSize(window.store.getState())} />;
  });
