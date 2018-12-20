import { createGlobalStyle } from 'styled-components';

import { getBackgroundColor } from '../components/ConnectedThemeProvider';
import { Color } from './index';

export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-app-region: no-drag;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background-color: ${getBackgroundColor};
    font-family: 'Nunito', sans-serif;
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 16px;
    display: auto;
  }

  ::-webkit-scrollbar-track {
    background: ${Color.DUSTY_GREY};
    display: auto;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.GREY};
    display: auto;

    &:hover {
      background: ${Color.LIGHTER_GREY};
    }
  }
`;
