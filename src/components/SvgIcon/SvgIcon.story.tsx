import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import SvgIcon, { defaultProps } from './SvgIcon';

const { STORYBOOK_SVGS } = process.env;
const SVGS = STORYBOOK_SVGS ? JSON.parse(STORYBOOK_SVGS) : [];
const defaultSize = typeof defaultProps.size! === 'string' ? String(defaultProps.size!) : `${defaultProps.size!}px`;

const onClick = action('clicked');

storiesOf(`${CATEGORIES.UI}SvgIcon`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(15))
  .add('default', () => {
    const imgSrc = select('Svg', SVGS, SVGS[0]);
    const size = text('size', defaultSize);
    const color = text('color', defaultProps.color!);
    const hoverColor = text('hoverColor', defaultProps.hoverColor!);
    const clickable = boolean('clickable', false);
    const disabled = boolean('disabled', false);
    const isActive = boolean('isActive', false);

    return (
      <SvgIcon
        color={color}
        disabled={disabled}
        hoverColor={hoverColor}
        imgSrc={imgSrc ? require(`../../assets/${imgSrc}`) : ''}
        isActive={isActive}
        onClick={clickable ? onClick : null}
        size={size}
      />
    );
  });
