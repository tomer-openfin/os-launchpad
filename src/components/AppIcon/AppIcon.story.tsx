import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { LauncherSize } from '../../types/commons';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import AppIcon from './AppIcon';

storiesOf(`${CATEGORIES.UI}AppIcon`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const imgSrc = text('imgSrc', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const launcherSize = select('size', Object(LauncherSize), LauncherSize.Large);
    const isClickable = boolean('isClickable', true);
    const isDisabled = boolean('isDisabled', false);
    const isLoading = boolean('isLoading', false);

    return (
      <AppIcon
        borderWidth={launcherSizeConfigs[launcherSize].appIconBorder}
        imgSrc={imgSrc}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={isClickable ? action('AppIcon clicked') : undefined}
        size={launcherSizeConfigs[launcherSize].appIcon}
      />
    );
  });
