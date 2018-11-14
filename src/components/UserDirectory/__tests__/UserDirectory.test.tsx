import * as enzyme from 'enzyme';
import * as React from 'react';

import UserDirectory from '../UserDirectory';

describe('<UserDirectory />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<UserDirectory />).is('div'));
  });
});
