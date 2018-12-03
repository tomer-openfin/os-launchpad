import * as enzyme from 'enzyme';
import * as React from 'react';

import noop, { noopCreator } from '../../../utils/noop';

import { LauncherPosition } from '../../../types/commons';
import App from '../App';

const bounds = {
  height: 0,
  left: 0,
  top: 0,
  width: 0,
};

describe('<App />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(
      <App
        launcherPosition={LauncherPosition.Top}
        launchWindow={noop}
      />,
    ).is('div'));
  });
});
