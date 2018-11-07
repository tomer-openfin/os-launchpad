import * as enzyme from 'enzyme';
import * as React from 'react';

import AppData from '../../../redux/apps/AppData';
import noop from '../../../utils/noop';

import AppDirectory from '../AppDirectory';

describe('<AppDirectory />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(
    <AppDirectory
      addToLauncher={noop}
      appList={AppData}
      launcherAppIds={['12', '7', '6']}
      removeFromLauncher={noop}
    />).is('div'));
  });
});
