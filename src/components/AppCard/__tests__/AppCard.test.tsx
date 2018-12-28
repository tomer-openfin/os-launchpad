import * as enzyme from 'enzyme';
import * as React from 'react';

import AppData from '../../../samples/AppData';
import noop from '../../../utils/noop';

import AppCard from '../AppCard';

describe('<AppCard />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<AppCard app={AppData[0]} launchApp={noop} />).is('div'));
  });
});
