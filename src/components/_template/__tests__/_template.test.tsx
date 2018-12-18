import * as enzyme from 'enzyme';
import * as React from 'react';

import Template from '../';

describe('<Template />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<Template />).is('div'));
  });
});
