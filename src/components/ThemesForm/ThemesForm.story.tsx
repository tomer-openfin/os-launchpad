import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import DEFAULT_THEMES from '../../utils/defaultThemes';
import { CATEGORIES } from '../../utils/storyCategories';

import ThemesForm from './ThemesForm';

const saveActiveThemeId = action('saveActiveThemeId');
const setActiveThemeId = action('setActiveThemeId');

storiesOf(`${CATEGORIES.ADMIN}ThemesForm`, module).add('default', () => (
  <ThemesForm activeThemeId={DEFAULT_THEMES[0].id} themes={DEFAULT_THEMES} saveActiveThemeId={saveActiveThemeId} setActiveThemeId={setActiveThemeId} />
));
