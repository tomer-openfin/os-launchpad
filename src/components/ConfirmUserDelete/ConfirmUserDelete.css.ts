import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { Color } from '../../styles/index';

export const Button = styled.button`
  align-items: center;
  background-color: none;
  border-radius: 3px;
  border: 1px solid ${Color.DUSTY_GREY};
  color: ${Color.DUSTY_GREY};
  display: flex;
  font-size: 12px;
  font-weight: 200;
  height: 25px;
  justify-content: center;
  margin: 10px 5px;
  padding: 0 10px;

  &:hover {
    background-color: ${Color.SEAGULL};
    cursor: pointer;
  }

  &:disabled {
    background-color: grey;
    cursor: default;
  }
`;

export const ButtonLink = styled(Link)`
  align-items: center;
  background-color: none;
  border-radius: 3px;
  border: 1px solid ${Color.DUSTY_GREY};
  color: ${Color.DUSTY_GREY};
  display: flex;
  font-size: 12px;
  font-weight: 200;
  height: 25px;
  justify-content: center;
  margin: 10px 5px;
  padding: 0 10px;

  &:hover {
    background-color: ${Color.SEAGULL};
    cursor: pointer;
  }

  &:disabled {
    background-color: grey;
    cursor: default;
  }
`;

export const Copy = styled.div`
  color: ${Color.SEAGULL};
  font-size: 12px;
  font-weight: bold;
  margin: 25px;
`;

export const Error = styled.div`
  background-color: ${Color.FAIL};
  color: ${Color.BASEBALL};
  display: block;
  height: auto;
`;

export const Heading = styled.div`
  color: ${Color.SEAGULL};
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 200;
  text-align: center;
  text-transform: uppercase;
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
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.BASEBALL};
  border-radius: 3px;
  border: 1px solid ${Color.LIGHTER_GREY};
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: flex-start;
  padding: 25px;
  width: 250px;
`;
