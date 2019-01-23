import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import { defaultProps } from '../SvgIcon/index';
import SvgIconWithExtension from './SvgIconWithExtension';

const { STORYBOOK_SVGS } = process.env;
const SVGS = STORYBOOK_SVGS ? JSON.parse(STORYBOOK_SVGS) : [];
const defaultSize = typeof defaultProps.size! === 'string' ? String(defaultProps.size!) : `${defaultProps.size!}px`;

const onClick = action('clicked');

storiesOf(`${CATEGORIES.COMPONENTS}SvgIconWithExtension`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(15))
  .add('default', () => {
    const extensionPosition = select('extensionPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const imgSrc = select('Svg', SVGS, SVGS[0]);
    const size = text('Size', defaultSize);
    const caretSize = number('Size', 25);
    const color = text('Color', defaultProps.color!);
    const hoverColor = text('Hover Color', defaultProps.hoverColor!);
    const clickable = boolean('Clickable', false);
    const disabled = boolean('Disabled', false);
    const isActive = boolean('Active', false);
    const title = text('Hover Title', 'Icon');

    return (
      <SvgIconWithExtension
        caretSize={caretSize}
        color={color}
        disabled={disabled}
        extensionPosition={extensionPosition}
        hoverColor={hoverColor}
        imgSrc={imgSrc ? require(`../../assets/${imgSrc}`) : ''}
        isActive={isActive}
        onClick={clickable ? onClick : null}
        size={size}
        title={title}
      />
    );
  });
