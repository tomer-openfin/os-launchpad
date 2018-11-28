import * as enzyme from 'enzyme';
import * as React from 'react';

import appData from '../../../const/AppData';

import AppDirectory from '../AppDirectory';

describe('<AppDirectory />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AppDirectory appList={appData} />).is('div'));
  });
});
