import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs';
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
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    const setLauncherPosition = action('setLauncherPosition');
    const setLauncherSize = action('setLauncherSize');

    return (
      <LauncherSettings
        launcherSize={launcherSize}
        launcherPosition={launcherPosition}
        setLauncherPosition={setLauncherPosition}
        setLauncherSize={setLauncherSize}
      />
    );
  });
