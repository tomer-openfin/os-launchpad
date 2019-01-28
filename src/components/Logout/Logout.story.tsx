import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Logout from './Logout';

const exit = action('exit');
const logout = action('logout');

storiesOf(`${CATEGORIES.COMPONENTS}Logout`, module).add('default', () => {
  return <Logout exit={exit} logout={logout} />;
});
