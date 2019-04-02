import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import AccountSettings from './AccountSettings';

storiesOf(`${CATEGORIES.COMPONENTS}AccountSettings`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const email = text('email', 'jason.grafinger@giantmachines.com');
    const name = text('name', 'Jason Grafinger');
    const showSupport = action('show support');

    return <AccountSettings email={email} name={name} showSupport={showSupport} />;
  });
