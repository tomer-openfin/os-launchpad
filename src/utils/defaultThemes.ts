import { Color } from '../styles';
import { Theme } from '../types/commons';

export enum DefaultThemeIds {
  Dark = 'dark',
  Light = 'light',
}

export const DEFAULT_THEME_ID = DefaultThemeIds.Dark;

const DEFAULT_THEMES: Theme[] = [
  {
    backgroundColor: Color.CHARCOAL,
    id: DefaultThemeIds.Dark,
    name: 'Dark',
  },
  {
    backgroundColor: Color.BASEBALL,
    id: DefaultThemeIds.Light,
    name: 'Light',
  },
];

export default DEFAULT_THEMES;
