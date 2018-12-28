import * as enzyme from 'enzyme';
import * as React from 'react';

import appData from '../../../samples/AppData';
import noop, { noopCreator } from '../../../utils/noop';

import AppDirectory from '../AppDirectory';

const getIsLauncherApp = () => false;

describe('<AppDirectory />', () => {
  it('renders a <div>', () => {
    expect(
      enzyme
        .shallow(
          <AppDirectory
            addToLauncher={noopCreator}
            appList={appData}
            getIsLauncherApp={getIsLauncherApp}
            onBlur={noop}
            onEscDown={noop}
            removeFromLauncher={noopCreator}
          />,
        )
        .is('div'),
    );
  });
});
