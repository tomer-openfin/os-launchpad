import { storiesOf } from '@storybook/react';
import * as React from 'react';

import userData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import AdminUsers from './AdminUsers';

storiesOf(`${CATEGORIES.ADMIN}AdminUsers`, module).add('default', () => <AdminUsers users={userData} />);
