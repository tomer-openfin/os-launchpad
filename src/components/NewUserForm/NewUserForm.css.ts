import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Color } from '../../styles/index';

import * as TinyDownArrowIcon from '../../assets/TinyDownArrow.svg';
import * as TinyUpArrowIcon from '../../assets/TinyUpArrow.svg';

export const Button = styled.button`
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
  flex: 1;
  outline: none;

  &:hover {
    background-color: ${Color.SEAGULL};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.GREY};
    cursor: default;
  }
`;

export const Copy = styled.div`
  color: ${Color.SEAGULL};
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 20px;
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
  outline: none;

  &:hover {
    background-color: ${Color.SEAGULL};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.GREY};
    cursor: default;
  }
`;

export const Error = styled.div`
  background-color: ${Color.FAIL};
  color: ${Color.BASEBALL};
  display: block;
  font-size: 10px;
  height: auto;
`;

export const Heading = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 200;
  color: ${Color.SEAGULL};
  margin-bottom: 20px;
  width: 100%;
`;

export const Label = styled.label`
  display: grid;
  font-size: 10px;
  margin-bottom: 20px;
  text-transform: uppercase;

  & > input,
  & > select,
  & > textarea {
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    resize: none;
    max-width: 220px;
    margin-top: 10px;
    height: 40px;
    padding: 14px 0 12px 11px;
  }

  select,
  textarea {
    padding: 6px 6px 8px 8px;
  }

  img {
    height: 124px;
    object-fit: scale-down;
    width: 220px;
  }
`;

export const Message = styled.div`
  align-items: center;
  background-color: ${Color.SUCCESS};
  color: ${Color.BLACK};
  display: flex;
  font-size: 10px;
  justify-content: center;
  padding: 5px 5px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 0 25px;
`;

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.BASEBALL};
  border-radius: 3px;
  border: 1px solid ${Color.LIGHTER_GREY};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  min-width: 200px;
  min-height: 200px;
`;

export const GridWrapper = styled.div`
  display: grid;
  margin-left: 10px;
  grid-template-columns: repeat(2, 220px);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
  max-height: 249px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 25px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${Color.WHITE};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.CHALK};

    &:hover {
      background: ${Color.LIGHTER_GREY};
    }
  }

  ::-webkit-scrollbar-button {
    &:start {
      &:decrement {
        background: url(${TinyUpArrowIcon}) ${Color.WHITE};
        background-size: 5px 5px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
      }
    }
    &:end {
      &:increment {
        background: url(${TinyDownArrowIcon}) ${Color.WHITE};
        background-size: 5px 5px;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
      }
    }
  }
`;
