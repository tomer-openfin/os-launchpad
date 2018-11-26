// Theme typed styled-components

import * as styledComponents from '../../node_modules/styled-components';

import { ThemedStyledComponentsModule } from '../../node_modules/@types/styled-components';

import { Theme } from '../redux/types';

const { default: styled, css, createGlobalStyle, keyframes, ThemeProvider } = styledComponents as ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider };

export * from '../../node_modules/@types/styled-components/index.d';

export default styled;
