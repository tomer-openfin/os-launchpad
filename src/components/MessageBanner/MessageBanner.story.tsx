import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { CATEGORIES } from '../../utils/storyCategories';

import Color from '../../styles/color';
import { ResponsiveWidth } from '../Responsive';
import MessageBanner from './MessageBanner';

const Wrapper = styled.div<{ border: boolean; responsive: boolean }>`
  ${({ responsive }) => responsive && ResponsiveWidth}

  width: 100vw;
  height: 100vh;
  ${({ border }) => border && 'border: 1px solid white;'}
`;

let isClosed = false;

storiesOf(`${CATEGORIES.UI}MessageBanner`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const errorMessage = text('Error Message', 'Failed to create');

    const reset = () => {
      isClosed = true;
      forceReRender();
    };
    const handleOpen = () => {
      isClosed = false;
      forceReRender();
    };

    const isActive = boolean('Shown', !isClosed);
    const backgroundColor = select('Background Color', Object(Color), Color.MARS);

    if (isActive && isClosed) handleOpen();

    const responsiveWrapper = boolean('Responsive Wrapper', false);
    const wrapperBorder = boolean('Wrapper Border', false);

    return (
      <Wrapper responsive={responsiveWrapper} border={wrapperBorder}>
        <MessageBanner backgroundColor={backgroundColor} message={errorMessage} reset={reset} isActive={isActive} />;
      </Wrapper>
    );
  });
