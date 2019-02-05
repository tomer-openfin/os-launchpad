import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import NewUserForm from './NewUserForm';

const createUser = action('createUser');
const onEscDown = action('onEscDown');

storiesOf(`${CATEGORIES.ADMIN}NewUserForm`, module).add('default', () => <NewUserForm createUser={createUser} onEscDown={onEscDown} pushRoute={noop} />);
