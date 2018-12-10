import * as enzyme from 'enzyme';
import * as React from 'react';

import appData from '../../../const/AppData';
import noop from '../../../utils/noop';

import AppDirectory from '../AppDirectory';

describe('<AppDirectory />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AppDirectory appList={appData} onEscDown={noop} onBlur={noop} />).is('div'));
  });
});
