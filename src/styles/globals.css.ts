import { createGlobalStyle } from 'styled-components';

import { getBackgroundColor } from '../components/ConnectedThemeProvider';

export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-app-region: no-drag;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background-color: ${getBackgroundColor};
    font-family: 'Muli', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;
