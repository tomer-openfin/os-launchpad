import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { LauncherPosition, UserLayout } from '../../types/commons';
import noop from '../../utils/noop';

import Layouts from './Layouts';

storiesOf('Components/Layouts', module).add('default', () => (
  <Layouts layoutIds={['layout']} launcherPosition={LauncherPosition.Top} restoreLayout={noop} saveLayout={noop} onBlur={noop} />
));
