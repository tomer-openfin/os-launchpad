import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
import noop from '../../utils/noop';

import Layouts from './Layouts';

storiesOf('Components/Layouts', module).add('default', () => (
  <Layouts isApplicationDrawerExpanded layoutIds={['layout']} launcherPosition={DirectionalPosition.Top} restoreLayout={noop} saveLayout={noop} onBlur={noop} />
));
