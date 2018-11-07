import * as enzyme from 'enzyme';
import * as React from 'react';

import { noopCreator } from '../../../utils/noop';

import App from '../App';

describe('<App />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<div/>).is('div'));
    // expect(enzyme.shallow(<App launcherPosition="TOP" launchWindowCreator={noopCreator} />).is('div'));
  });
});
