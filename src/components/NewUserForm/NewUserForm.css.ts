import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '../../styles/index';

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
  background-color: ${Color.SUCCESS};
  display: flex;
  color: ${Color.BLACK};
  font-size: 12px;
  margin: 5px 5px;
  padding: 5px 5px;
`;

export const Error = styled.div`
  background-color: ${Color.FAIL};
  color: ${Color.BASEBALL};
  display: block;
  height: auto;
`;

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.BASEBALL};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 25px;
`;

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

export const Heading = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 200;
  color: ${Color.SEAGULL};
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
`;
