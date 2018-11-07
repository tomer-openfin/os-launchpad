import * as enzyme from 'enzyme';
import * as React from 'react';

import AppData from '../../../redux/apps/AppData';
import { noopCreator } from '../../../utils/noop';

import AppList from '../AppList';

describe('<AppList />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AppList launcherPosition="TOP" appList={AppData} launchWindowCreator={noopCreator} />).is('div'));
  });
});
