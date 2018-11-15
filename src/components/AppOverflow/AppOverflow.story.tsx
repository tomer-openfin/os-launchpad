import * as React from 'react';

import { storiesOf } from '@storybook/react';

import AppOverflow from './AppOverflow';

storiesOf('Components/AppOverflow', module)
  .add('default', () => <AppOverflow />);
