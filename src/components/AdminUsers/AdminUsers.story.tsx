import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import userData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import AdminUsers, { Stage } from './AdminUsers';

storiesOf(`${CATEGORIES.ADMIN}AdminUsers`, module)
  .addDecorator(withKnobs)
  .add('default', () => <AdminUsers users={userData} />)
  .add('withStages', () => {
    const currentAction = select('stage', Object(Stage), Stage.Default);

    return <AdminUsers users={userData} currentAction={currentAction} id={userData[0].id} />;
  });
