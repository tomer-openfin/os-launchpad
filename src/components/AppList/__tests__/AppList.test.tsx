import * as enzyme from 'enzyme';
import * as React from 'react';

import AppList from '../';

describe('<AppList />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AppList />).is('div'));
  });
});
