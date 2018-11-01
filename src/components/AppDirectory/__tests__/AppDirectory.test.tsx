import * as enzyme from 'enzyme';
import * as React from 'react';

import AppDirectory from '../index';

describe('<AppDirectory />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AppDirectory />).is('div'));
  });
});
