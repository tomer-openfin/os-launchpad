import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import appData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import AdminApps, { Stage } from './AdminApps';

storiesOf(`${CATEGORIES.ADMIN}AdminApps`, module)
  .addDecorator(withKnobs)
  .add('default', () => <AdminApps apps={appData} />)
  .add('withStages', () => {
    const currentAction = select('stage', Object(Stage), Stage.Default);

    return <AdminApps apps={appData} currentAction={currentAction} id={appData[0].id} />;
  });
