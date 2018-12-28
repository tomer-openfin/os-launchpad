import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import Layouts from './Layouts';

storiesOf(`${CATEGORIES.COMPONENTS}Layouts`, module).add('default', () => (
  <Layouts isApplicationDrawerExpanded layoutIds={['layout']} launcherPosition={DirectionalPosition.Top} restoreLayout={noop} saveLayout={noop} onBlur={noop} />
));
