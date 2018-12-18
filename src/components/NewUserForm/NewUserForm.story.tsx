import * as React from 'react';

import { storiesOf } from '@storybook/react';

import noop from '../../utils/noop';
import NewUserForm from './NewUserForm';

storiesOf('Components/NewUserForm', module).add('default', () => <NewUserForm createUser={noop} />);
