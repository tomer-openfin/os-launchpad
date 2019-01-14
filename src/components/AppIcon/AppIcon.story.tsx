import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { AppIconSizes } from '../../types/commons';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import AppIcon from './AppIcon';

storiesOf(`${CATEGORIES.UI}AppIcon`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(15))
  .add('default', () => {
    const imgSrc = text('imgSrc', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const size = select('size', Object(AppIconSizes), AppIconSizes.Medium);
    const isClickable = boolean('isClickable', false);
    const isDisabled = boolean('isDisabled', false);

    return <AppIcon imgSrc={imgSrc} isDisabled={isDisabled} onClick={isClickable ? action('AppIcon clicked') : undefined} size={size} />;
  });
