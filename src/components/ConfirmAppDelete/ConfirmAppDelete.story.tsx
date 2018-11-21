import * as React from 'react';

import { storiesOf } from '@storybook/react';

import ConfirmAppDelete from './';

import noop from '../../utils/noop';

// mock .location.state structure from using react-router
const currentAppData = {
  location: {
    state: {
      id: '1',
      title: 'openFin',
    },
  },
};

storiesOf('ConfirmAppDelete', module).add('default', () => <ConfirmAppDelete deleteApp={noop} location={currentAppData.location} />);
