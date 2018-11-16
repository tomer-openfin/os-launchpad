import * as enzyme from 'enzyme';
import * as React from 'react';

import AppData from '../../../const/AppData';
import AdminApps from '../AdminApps';

describe('<AdminApps />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AdminApps apps={AppData} />).is('div'));
  });
});
