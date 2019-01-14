import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { AppStatusStates } from '../../redux/apps/types';
import { CATEGORIES } from '../../utils/storyCategories';

import { DirectionalPosition } from '../../types/enums';
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

    return (
      <Wrapper>
        <AppIndicator position={position} appStatusState={appStatusState} />
      </Wrapper>
    );
  });
