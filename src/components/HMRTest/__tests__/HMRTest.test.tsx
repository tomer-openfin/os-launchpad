import * as enzyme from 'enzyme';
import * as React from 'react';

import HMRTest from '../';

describe('<HMRTest />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<HMRTest />).is('div'));
  });
});
