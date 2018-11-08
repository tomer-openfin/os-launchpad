import styled from 'styled-components';

import { Color } from '../../styles';

import * as TinyDownArrow from '../../assets/TinyDownArrow.svg';
import * as TinyUpArrow from '../../assets/TinyUpArrow.svg';

export const Wrapper = styled.div`
  background: ${Color.CHARCOAL};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Directory = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  overflow-x: hidden;

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
        background: url(${TinyUpArrow}) ${Color.CHARCOAL};
        background-size: 8px 8px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        border-left: 1px solid ${Color.DUSTY_GREY};
      }
    }
    &:end {
      &:increment {
        background: url(${TinyDownArrow}) ${Color.CHARCOAL};
        background-size: 8px 8px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        border-left: 1px solid ${Color.DUSTY_GREY};
      }
    }
  }
`;

export const SearchHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  z-index: 3;
  background: ${Color.DUSTY_GREY};
  border-bottom: 1px solid ${Color.SEAGULL};
`;

export const SearchInput = styled.input`
  color: ${Color.WHITE};
  font-size: 20px;
  font-weight: 200;
  border: none;
  outline: none;
  background: ${Color.TRANSPARENT};
`;
