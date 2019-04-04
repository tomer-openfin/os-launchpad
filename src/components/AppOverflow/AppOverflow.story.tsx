import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { setLauncherPosition } from '../../redux/me';
import { DirectionalPosition } from '../../types/commons';
import { CATEGORIES } from '../../utils/storyCategories';

import AppOverflow from './AppOverflow';

storiesOf(`${CATEGORIES.COMPONENTS}AppOverflow`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    window.store.dispatch(setLauncherPosition({ launcherPosition }));

    return <AppOverflow launcherPosition={launcherPosition} />;
  });
