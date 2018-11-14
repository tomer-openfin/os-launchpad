import { storiesOf } from '@storybook/react';
import * as React from 'react';

import noop from '../../utils/noop';

import Layouts from './Layouts';

storiesOf('Layouts', module)
  .add('default', () => (
    <Layouts />
  ));
