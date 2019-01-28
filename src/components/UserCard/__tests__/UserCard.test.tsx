import * as enzyme from 'enzyme';
import * as React from 'react';

import MockUserData from '../../../samples/UserData';
import UserCard from '../UserCard';

describe('<UserCard />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<UserCard user={MockUserData[0]} />).is('div'));
  });
});
