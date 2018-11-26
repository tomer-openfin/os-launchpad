import { storiesOf } from '@storybook/react';
import * as React from 'react';

import LogoFormContainer from './LogoFormContainer';

storiesOf('Components/LogoFormContainer', module)
  .add('default', () => (
    <LogoFormContainer />
  ));
