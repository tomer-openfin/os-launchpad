import * as enzyme from 'enzyme';
import * as React from 'react';

import App from '../App';

describe('<App />', () => {
  it('renders a button as a child', () => {
    expect(enzyme.shallow(<App />).find('Button').length).toEqual(1);
  });
});
