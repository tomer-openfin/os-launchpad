import * as React from 'react';

import { storiesOf } from '@storybook/react';

import ConfirmAppDelete from './ConfirmAppDelete';

import AppData from '../../const/AppData';
import noop from '../../utils/noop';

const mockAppData = {
  state: AppData[0],
};

storiesOf('ConfirmAppDelete', module).add('default', () => <ConfirmAppDelete deleteApp={noop} location={mockAppData} />);
