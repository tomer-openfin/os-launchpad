import * as enzyme from 'enzyme';
import * as React from 'react';

import ConfirmAppDelete from '../ConfirmAppDelete';

import AppData from '../../../const/AppData';
import noop from '../../../utils/noop';

const mockAppData = {
  state: AppData[0],
};

describe('<ConfirmAppDelete />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<ConfirmAppDelete deleteApp={noop} location={mockAppData} />).is('div'));
  });
});
