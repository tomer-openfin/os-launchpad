import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { LauncherPosition } from '../../types/commons';
import noop from '../../utils/noop';

import Layouts from './Layouts';

storiesOf('Components/Layouts', module).add('default', () => (
  <Layouts launcherPosition={LauncherPosition.Top} restoreCurrentLayout={noop} saveCurrentLayout={noop} onBlur={noop} />
));
