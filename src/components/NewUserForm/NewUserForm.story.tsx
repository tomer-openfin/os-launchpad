import * as React from 'react';

import { storiesOf } from '@storybook/react';

import NewUserForm from './';

import noop from '../../utils/noop';

storiesOf('Components/NewUserForm', module).add('default', () => <NewUserForm createUser={noop} />);
