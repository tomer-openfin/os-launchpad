import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import LauncherSettings from './LauncherSettings';

storiesOf(`${CATEGORIES.COMPONENTS}LauncherSettings`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const systemTrayEnabled = boolean('systemTrayEnabled', false);
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    const setSystemTrayEnabled = action('setSystemTrayEnabled');
    const setLauncherPosition = action('setLauncherPosition');
    const setLauncherSize = action('setLauncherSize');

    return (
      <LauncherSettings
        launcherSize={launcherSize}
        launcherPosition={launcherPosition}
        setSystemTrayEnabled={setSystemTrayEnabled}
        setLauncherPosition={setLauncherPosition}
        setLauncherSize={setLauncherSize}
        systemTrayEnabled={systemTrayEnabled}
      />
    );
  });
