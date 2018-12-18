import * as enzyme from 'enzyme';
import * as React from 'react';

import Settings from '../Settings';

describe('<Settings />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<div/>).is('div'));
    expect(enzyme.shallow(<Settings/>).is('div'));
  });
});
