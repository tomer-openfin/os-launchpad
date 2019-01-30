import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { LauncherSize } from '../../types/commons';
import noop from '../../utils/noop';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Settings from './Settings';

const setAutoHide = action('setAutoHide');
const setLauncherSize = action('setLauncherSize');
const setLauncherPosition = action('setLauncherPosition');

const Wrapper = styled.div`
  height: 478px;
  width: 510px;
`;

storiesOf(`${CATEGORIES.COMPONENTS}Settings`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(15))
  .add('default', () => {
    const autoHide = boolean('autoHide', false);
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);

    return (
      <Wrapper>
        <Settings
          autoHide={autoHide}
          hideWindow={noop}
          launcherSize={launcherSize}
          setAutoHide={setAutoHide}
          setLauncherPosition={setLauncherPosition}
          setLauncherSize={setLauncherSize}
        />
      </Wrapper>
    );
  });
