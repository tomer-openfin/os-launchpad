import * as enzyme from 'enzyme';
import * as React from 'react';

import AppData from '../../../const/AppData';
import noop, { noopCreator } from '../../../utils/noop';

import AppList from '../AppList';

import { DirectionalPosition } from '../../../types/commons';

describe('<AppList />', () => {
  it('renders a <div>', () => {
    expect(
      enzyme
        .shallow(
          <AppList
            appList={AppData}
            appsStatusByName={{}}
            launchApp={noop}
            launcherPosition={DirectionalPosition.Top}
            launchWindowCreator={noopCreator}
            removeFromLauncher={noopCreator}
            spaceCount={4}
          />,
        )
        .is('div'),
    );
  });
});
