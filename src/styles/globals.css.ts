import { createGlobalStyle } from 'styled-components';
import * as Color from './color';

export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-app-region: no-drag;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background: ${Color.CHARCOAL};
    font-family: sans-serif;
  }
  `;
