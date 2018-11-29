import * as React from 'react';

import { storiesOf } from '@storybook/react';

import appData from '../../const/AppData';
import noop from '../../utils/noop';

import AppDirectory from './AppDirectory';

storiesOf('Components/AppDirectory', module).add('default', () => <AppDirectory appList={appData} onBlur={noop} />);
