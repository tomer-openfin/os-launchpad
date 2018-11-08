import * as enzyme from 'enzyme';
import * as React from 'react';

import AppData from '../../../const/AppData';
import { noopCreator } from '../../../utils/noop';

import AppCard from '../AppCard';

describe('<AppCard />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AppCard addToLauncher={noopCreator} app={AppData[0]} isLauncherApp={false} removeFromLauncher={noopCreator} />).is('div'));
  });
});
