import { storiesOf } from '@storybook/react';
import * as React from 'react';

import userData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import UserDirectory from './UserDirectory';

storiesOf(`${CATEGORIES.ADMIN}UserDirectory`, module).add('default', () => <UserDirectory users={userData} />);
