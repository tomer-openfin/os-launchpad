import * as enzyme from 'enzyme';
import * as React from 'react';

import ConfirmAppDelete from '../';

import noop from '../../../utils/noop';

// mock .location.state structure from using react-router
const currentAppData = {
  location: {
    state: {
      id: '1',
      title: 'openFin',
    },
  },
};

describe('<ConfirmAppDelete />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<ConfirmAppDelete deleteApp={noop} location={currentAppData.location} />).is('div'));
  });
});
