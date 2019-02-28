import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import OrganizationSettings from './OrganizationSettings';

storiesOf(`${CATEGORIES.ADMIN}OrganizationSettings`, module).add('default', () => <OrganizationSettings />);
