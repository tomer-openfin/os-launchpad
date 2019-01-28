import * as enzyme from 'enzyme';
import * as React from 'react';

import noop from '../../../utils/noop';
import NewUserForm from '../NewUserForm';

const mockData = {
  location: {
    state: {
      email: 'name@giantfin.co',
      firstName: 'Dusya',
      id: 'string',
      isAdmin: false,
      lastName: 'Sigachyova',
      middleInitial: 'L',
      phone: '',
      tmpPassword: 'string',
      username: 'string',
    },
  },
};

describe('<NewUserForm />', () => {
  it('to render without a css class', () => {
    expect(
      enzyme
        .shallow(<NewUserForm location={mockData.location} createUser={noop} />)
        .find('.some-class')
        .exists(),
    ).toEqual(false);
  });
});
