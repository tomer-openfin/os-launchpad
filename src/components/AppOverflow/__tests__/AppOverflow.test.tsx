import * as enzyme from 'enzyme';
import * as React from 'react';

import AppOverflow from '../AppOverflow';

describe('<AppOverflow />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(
    <AppOverflow
    />).is('div'));
  });
});
