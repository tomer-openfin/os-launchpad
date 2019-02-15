import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import * as Logo from '../../assets/Logo.svg';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';
import { ROUTES } from '../Router/consts';

import Color from '../../styles/color';
import { DeleteIconLink, EditIconLink } from '../OrganizationSettings';
import { CTAWrapper } from './ImageCard.css';

import ImageCard from './ImageCard';

const Wrapper = styled.div<{ showBounds: boolean }>`
  border: ${({ showBounds }) => (showBounds ? '1px' : '0')} solid ${Color.SUN};
`;

const renderCtas = (withEdit: boolean, withDelete: boolean) => (
  <CTAWrapper>
    {withEdit && <EditIconLink to={{ pathname: ROUTES.ADMIN_SETTINGS_EDIT }} />}

    {withDelete && <DeleteIconLink to={{ pathname: ROUTES.ADMIN_SETTINGS_DELETE }} />}
  </CTAWrapper>
);

storiesOf(`${CATEGORIES.COMPONENTS}ImageCard`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(25))
  .add('default', () => {
    const title = text('Title', 'Launcher Logo');
    const meta = text('Meta', '80x80');
    const withEdit = boolean('With Edit', true);
    const withDelete = boolean('With Delete', true);
    const showBounds = boolean('Show Bounds', false);

    return (
      <Wrapper showBounds={showBounds}>
        <ImageCard title={title} meta={meta} imgSrc={Logo} ctas={renderCtas(withEdit, withDelete)} />
      </Wrapper>
    );
  });
