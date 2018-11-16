import * as React from 'react';

import { storiesOf } from '@storybook/react';

import UserDirectory from './index';

storiesOf('Components/UserDirectory', module)
  .add('default', () => <UserDirectory />);
