import * as React from 'react';

import { storiesOf } from '@storybook/react';

import ConfirmAppDelete from './';

import AppData from '../../const/AppData';
import noop from '../../utils/noop';

storiesOf('ConfirmAppDelete', module).add('default', () => <ConfirmAppDelete deleteApp={noop} location={{ state: AppData[0] }} />);
