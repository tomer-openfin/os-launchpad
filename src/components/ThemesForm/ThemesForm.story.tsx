import { storiesOf } from '@storybook/react';
import * as React from 'react';

import DEFAULT_THEMES from '../../utils/defaultThemes';
import noop from '../../utils/noop';

import ThemesForm from './ThemesForm';

storiesOf('Components/ThemesFormContainer', module)
  .add('default', () => (
    <ThemesForm
      activeThemeId={DEFAULT_THEMES[0].id}
      themes={DEFAULT_THEMES}
      setActiveThemeId={noop}
      saveActiveThemeId={noop}
    />
  ));
