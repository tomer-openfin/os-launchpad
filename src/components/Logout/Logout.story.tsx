import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Logout from './Logout';

const isEnterprise = boolean('isEnterprise', true);
const exit = action('exit');
const logout = action('logout');

storiesOf(`${CATEGORIES.COMPONENTS}Logout`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    return <Logout isEnterprise={isEnterprise} exit={exit} logout={logout} />;
  });
