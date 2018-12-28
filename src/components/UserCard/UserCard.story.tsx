import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import UserCard from './UserCard';

storiesOf(`${CATEGORIES.ADMIN}UserCard`, module).add('default', () => <UserCard user={UserData[0]} />);
