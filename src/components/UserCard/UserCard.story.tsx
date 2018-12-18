import * as React from 'react';

import { storiesOf } from '@storybook/react';

import MockUserData from '../UserDirectory/MockUserData';
import UserCard from './index';

storiesOf('Components/UserCard', module).add('default', () => <UserCard user={MockUserData[0]} />);
