import * as enzyme from 'enzyme';
import * as React from 'react';

import Admin from '../Admin';

describe('<Admin />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<Admin isAdmin />).is('div'));
  });
});
