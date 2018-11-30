import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Color } from '../../styles/index';

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
  margin: 25px;
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
`;

export const Label = styled.label`
  display: block;
  height: 20px;
  margin: 30px 5px;
  & > input,
  & > select {
    margin-left: 15px;
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
