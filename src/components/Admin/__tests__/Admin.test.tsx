import * as enzyme from 'enzyme';
import * as React from 'react';

import noop from '../../../utils/noop';
import Admin from '../Admin';

describe('<Admin />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<Admin isAdmin hideWindow={noop} onEscDown={noop} />).is('div'));
  });
});
