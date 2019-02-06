import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import AppCard from './AppCard';

storiesOf(`${CATEGORIES.COMPONENTS}AppCard`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isLoading = boolean('isLoading', false);
    const launchApp = action('Launch app');

    return <AppCard app={AppData[0]} isLoading={isLoading} launchApp={launchApp} />;
  });
