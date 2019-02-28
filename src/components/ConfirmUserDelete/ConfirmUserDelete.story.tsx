import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import ConfirmUserDelete from './ConfirmUserDelete';

const user = UserData[0];
const deleteUser = action('deleteUser');
const pushRoute = action('pushRoute');

storiesOf(`${CATEGORIES.ADMIN}ConfirmUserDelete`, module).add('default', () => <ConfirmUserDelete deleteUser={deleteUser} user={user} pushRoute={pushRoute} />);
