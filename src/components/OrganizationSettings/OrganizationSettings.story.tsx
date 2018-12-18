import { storiesOf } from '@storybook/react';
import * as React from 'react';

import OrganizationSettings from './OrganizationSettings';

storiesOf('Components/OrganizationSettings', module)
  .add('default', () => (
    <OrganizationSettings />
  ));
