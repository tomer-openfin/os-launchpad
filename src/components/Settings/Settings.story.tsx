import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Settings from './Settings';

storiesOf('Settings', module)
  .add('default', () => (
    <Settings/>
  ));
