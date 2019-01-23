import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { CATEGORIES } from '../../utils/storyCategories';

import { AppStatusStates, DirectionalPosition, LauncherSize } from '../../types/enums';
import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import AppIndicator from './AppIndicator';

const Wrapper = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;
`;

storiesOf(`${CATEGORIES.UI}AppIndicator`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const appStatusState = select('status', Object(AppStatusStates), AppStatusStates.Loading);
    const position = select('position', Object(DirectionalPosition), DirectionalPosition.Top);
    const launcherSize = select('size', Object(LauncherSize), LauncherSize.Large);
    const size = launcherSizeConfigs[launcherSize].appIndicator;

    return (
      <Wrapper>
        <AppIndicator appStatusState={appStatusState} position={position} size={size} />
      </Wrapper>
    );
  });
