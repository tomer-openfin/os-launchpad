import * as enzyme from 'enzyme';
import * as React from 'react';

import NewUserForm from '../NewUserForm';

import noop from '../../../utils/noop';

describe('<NewUserForm />', () => {
  it('to render without a css class', () => {
    expect(
      enzyme
        .shallow(<NewUserForm createUser={noop} />)
        .find('.some-class')
        .exists(),
    ).toEqual(false);
  });
});
