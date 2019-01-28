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
    width: 8px;
    overflow-y: auto;
  }

  ::-webkit-scrollbar-track {
    background: ${Color.KUIPER_BELT};
    border-radius: 4px;
    border: solid 3px transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.MERCURY};
    border-radius: 4px;
    border: solid 3px transparent;
  }
`;
