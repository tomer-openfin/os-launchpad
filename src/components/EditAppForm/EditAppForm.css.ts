import { Form } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as TinyDownArrowIcon from '../../assets/TinyDownArrow.svg';
import * as TinyUpArrowIcon from '../../assets/TinyUpArrow.svg';

import { Color } from '../../styles/index';

export const Button = styled.button`
  align-items: center;
  background-color: none;
  border: 1px solid ${Color.CLOUDY};
  color: ${Color.WHITE};
  display: flex;
  font-size: 14px;
  font-weight: 200;
  height: 40px;
  justify-content: center;
  margin: 10px 10px 20px 0px;
  max-width: 110px;
  padding: 0 10px;

  flex: 1;

  &:hover {
    background-color: ${Color.SEAGULL};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.GREY};
    cursor: default;
  }
`;

export const ButtonLink = styled(Link)`
  align-items: center;
  border: 1px solid ${Color.CLOUDY};
  background-color: ${Color.GALLERY};
  color: ${Color.BLACK};
  display: flex;
  flex: 1;
  font-size: 14px;
  font-weight: 200;
  height: 40px;
  justify-content: center;
  margin: 10px 10px 20px 0px;
  max-width: 110px;
  padding: 0 10px;

  &:hover {
    background-color: ${Color.SEAGULL};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.GREY};
    cursor: default;
  }
`;

export const Copy = styled.p`
  background: ${Color.ALTO};
  font-size: 14px;
  margin: 0;
  max-height: 40px;
  padding: 14px 0px 10px 10px;
`;

export const Error = styled.div`
  background-color: ${Color.FAIL};
  color: ${Color.BASEBALL};
  display: block;
  height: auto;
  padding: 2px;
  text-align: center;
`;

export const Heading = styled.div`
  background: ${Color.DUSTY_GREY};
  color: ${Color.WHITE};
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 200;
  max-height: 20px;
  padding: 4px 0 2px 5px;
  text-align: left;
`;

export const GridContainer = styled.div`
  display: grid;
  margin-left: 10px;
  grid-template-columns: repeat(2, 220px);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
  max-height: 249px;
  overflow-y: scroll;
  overflow-x: hidden;

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

export const Label = styled.label`
  display: grid;
  font-size: 8px;
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

export const LogoLabel = styled.label`
  cursor: pointer;
  font-size: 8px;
  margin-left: 10px;
  text-transform: uppercase;
`;

export const Input = styled.input`
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
`;

export const Message = styled.div`
  background-color: ${Color.SUCCESS};
  color: ${Color.BLACK};
  display: flex;
  font-size: 12px;
  margin: 5px 5px;
  padding: 5px 5px;
`;

export const Row = styled.div`
  align-items: center;
  background: ${Color.ALTO};
  display: flex;
  justify-content: center;
  margin: 0;
  max-height: 70px;
  padding: 20px 0;
`;

export const Wrapper = styled.div`
  background-color: ${Color.BASEBALL};
  border: 1px solid ${Color.LIGHTER_GREY};
  height: 451px;
  width: 480px;
`;
