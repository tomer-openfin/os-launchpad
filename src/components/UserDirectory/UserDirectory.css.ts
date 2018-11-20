import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { Color } from '../../styles/index';

import * as TinyDownArrowIcon from '../../assets/TinyDownArrow.svg';
import * as TinyUpArrowIcon from '../../assets/TinyUpArrow.svg';

const HEADING_HEIGHT = '30px';

export const HeadingWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  height: ${HEADING_HEIGHT};
  margin-top: 30px;
  width: 100%;
`;

export const LinkWrapper = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-evenly;
`;

export const Input = styled.input`
  border-radius: 3px;
  border: none;
  font-size: 12px;
  height: 25px;
  padding: 0 10px;
  min-width: 200px;
  outline: 0;
`;

export const Select = styled.select`
  border: 2px solid ${Color.SEAGULL};
  margin-left: 10px;
  border-radius: 2px;
  font-weight: 400;
  line-height: normal;
`;

export const Label = styled.label`
  font-size: 11px;
  font-weight: bold;
`;

export const ButtonLink = styled(Link)`
  background-color: none;
  color: ${Color.DUSTY_GREY};
  border: 1px solid ${Color.DUSTY_GREY};
  border-radius: 3px;
  margin: 10px 5px;
  height: 25px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font-size: 12px;

  &:hover {
    background-color: ${Color.SEAGULL};
    cursor: pointer;
  }

  &:disabled {
    background-color: grey;
    cursor: default;
  }
`;

export const LinkButton = styled.button`
  background: none;
  border-width: 0;
  color: ${Color.SEAGULL};
  margin: 5px;
  padding: 0;
  text-decoration: none;
  text-transform: none;

  &:hover {
    background: none;
    color: grey;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const ListWrapper = styled.ul`
  color: ${Color.CHARCOAL};
  font-size: 10px;
  height: calc(100vh - 2 * ${HEADING_HEIGHT});
  overflow-y: scroll;

  & > li {
    align-items: center;
    border-bottom: 1px solid ${Color.FOG};
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    margin: 25px 0;
    height: 25px;
    padding-right: 25px;
  }

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: ${Color.FOG};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.OVERCAST};

    &:hover {
      background: ${Color.CEMENT};
    }
  }

  ::-webkit-scrollbar-button {
    &:start {
      &:decrement {
        background: url(${TinyUpArrowIcon}) ${Color.BASEBALL};
        background-size: 8px 8px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        border-left: 1px solid ${Color.FOG};
      }
    }
    &:end {
      &:increment {
        background: url(${TinyDownArrowIcon}) ${Color.BASEBALL};
        background-size: 8px 8px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        border-left: 1px solid ${Color.FOG};
      }
    }
  }
`;

export const Wrapper = styled.div`
  background-color: ${Color.BASEBALL};
  height: 100%;
  width: 100%;

  & > ul {
    list-style: none;
    margin: 0;
  }
`;

export const ListElement = styled.div`
  flex: 1;
`;
