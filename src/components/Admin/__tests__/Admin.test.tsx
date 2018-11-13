import * as enzyme from 'enzyme';
import * as React from 'react';

import Admin from '../';

describe('<Admin />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<Admin />).is('div'));
  });
});
