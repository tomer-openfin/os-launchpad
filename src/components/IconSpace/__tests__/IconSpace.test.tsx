import * as enzyme from 'enzyme';
import * as React from 'react';

import IconSpace from '../';

describe('<IconSpace />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<IconSpace />).is('div'));
  });
});
