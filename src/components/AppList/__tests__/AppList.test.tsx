import * as enzyme from 'enzyme';
import * as React from 'react';

import AppData from '../../../const/AppData';
import { noopCreator } from '../../../utils/noop';

import AppList from '../AppList';

describe('<AppList />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(
      <AppList removeFromLauncher={noopCreator} launcherPosition="TOP" appList={AppData} launchWindowCreator={noopCreator} spaceCount={4} />,
    ).is('div'));
  });
});
