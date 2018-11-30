import * as enzyme from 'enzyme';
import * as React from 'react';

import noop from '../../../utils/noop';
import NewUserForm from '../NewUserForm';

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
