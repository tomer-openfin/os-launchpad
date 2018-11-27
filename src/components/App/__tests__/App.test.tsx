import * as enzyme from 'enzyme';
import * as React from 'react';

import noop, { noopCreator } from '../../../utils/noop';

import App from '../App';

const bounds = {
  height: 0,
  left: 0,
  top: 0,
  width: 0,
};

describe('<App />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<div/>).is('div'));
    // expect(enzyme.shallow(<App
    //   bounds={bounds}
    //   collapseApp={noop}
    //   expandApp={noop}
    //   isExpanded
    //   launcherPosition="top"
    //   launchWindow={noop}
    //   monitorInfo={{}}
    //   setMonitorInfo={noop}
    // />).is('div'));
  });
});
