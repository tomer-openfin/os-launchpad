import * as enzyme from 'enzyme';
import * as React from 'react';

import noop from '../../../utils/noop';
import ConfirmUserDelete from '../ConfirmUserDelete';

// mock .location.state structure from using react-router
const currentUserData = {
  location: {
    state: {
      email: 'string',
      firstName: 'string',
      id: 'string',
      isAdmin: false,
      lastName: 'string',
      middleInitial: 'string',
      phone: 'string',
      tmpPassword: 'string',
      username: 'string',
    },
  },
};

describe('<ConfirmUserDelete />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<ConfirmUserDelete deleteUser={noop} location={currentUserData.location} />).is('div'));
  });
});
