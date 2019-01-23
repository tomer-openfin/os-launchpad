import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { noopCreator } from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import OrganizationSettings from './OrganizationSettings';

storiesOf(`${CATEGORIES.ADMIN}OrganizationSettings`, module).add('default', () => <OrganizationSettings autoLoginOrg={true} setOrgAutoLogin={noopCreator} />);
