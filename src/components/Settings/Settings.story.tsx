import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { CATEGORIES } from '../../utils/storyCategories';

import Settings from './Settings';

const hideWindow = action('hideWindow');
const setAutoHide = action('setAutoHide');
const setLauncherSize = action('setLauncherSize');
const setLauncherPosition = action('setLauncherPosition');

storiesOf(`${CATEGORIES.COMPONENTS}Settings`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isEnterprise = boolean('isEnterprise', false);
    const autoHide = boolean('autoHide', false);
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);

    return (
      <Settings
        autoHide={autoHide}
        hideWindow={hideWindow}
        isEnterprise={isEnterprise}
        launcherPosition={launcherPosition}
        launcherSize={launcherSize}
        setAutoHide={setAutoHide}
        setLauncherPosition={setLauncherPosition}
        setLauncherSize={setLauncherSize}
      />
    );
  });
