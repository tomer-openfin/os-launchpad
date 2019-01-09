import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { number, withKnobs } from '@storybook/addon-knobs';
import Notifications from '../Notifications';

storiesOf(`${CATEGORIES.COMPONENTS}Notifications`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const count = number('count', 23);

    return <Notifications count={count}>{count}</Notifications>;
  });
