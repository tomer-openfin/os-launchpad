import { createGlobalStyle } from 'styled-components';

import * as TinyDownArrowIcon from '../assets/TinyDownArrow.svg';
import * as TinyUpArrowIcon from '../assets/TinyUpArrow.svg';

import { getBackgroundColor } from '../components/ConnectedThemeProvider';
import * as Color from './color';

export const GlobalStyle = createGlobalStyle`
  * {
    -webkit-app-region: no-drag;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background-color: ${getBackgroundColor};
    font-family: 'Muli', sans-serif;
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: ${Color.DUSTY_GREY};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.GREY};

    &:hover {
      background: ${Color.LIGHTER_GREY};
    }
  }

  ::-webkit-scrollbar-button {
    &:start {
      &:decrement {
        background: url(${TinyUpArrowIcon}) ${Color.CHARCOAL};
        background-size: 8px 8px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        border-left: 1px solid ${Color.DUSTY_GREY};
      }
    }
    &:end {
      &:increment {
        background: url(${TinyDownArrowIcon}) ${Color.CHARCOAL};
        background-size: 8px 8px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        border-left: 1px solid ${Color.DUSTY_GREY};
      }
    }
  }
`;
