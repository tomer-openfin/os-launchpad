import { storiesOf } from '@storybook/react';
import * as React from 'react';

import DEFAULT_THEMES from '../../utils/defaultThemes';
import ThemesFormContainer from './ThemesFormContainer';

storiesOf('Components/ThemesFormContainer', module)
  .add('default', () => (
    <ThemesFormContainer
      themes={DEFAULT_THEMES}
    />
  ));
