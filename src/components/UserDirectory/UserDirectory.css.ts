import styled from 'styled-components';

import { Color } from '../../styles/index';

export const HeadingWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
`;

export const LinkWrapper = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: flex-end;
`;

export const Input = styled.input`
  border-radius: 3px;
  border: none;
  font-family: 'Garamond', sans-serif;
  font-size: 1.1em;
  padding: 5px;

  &:focus {
    outline: 0;
  }
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

export const Button = styled.button`
  background-color: dodgerblue;
  border: none;
  border-radius: 3px;
  margin: 10px 5px;
  padding: 5px;

  &:hover {
    background-color: salmon;
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
  color: dodgerblue;
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
  color: #020;
  display: flex;
  flex-direction: column;
  font-size: 10px;

  & > li {
    align-items: center;
    border-bottom: 1px solid lightgrey;
    display: flex;
    margin: 15px 0;
  }
`;

export const Wrapper = styled.div`
  background-color: #edeeef;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 10px;

  & > ul {
    list-style: none;
  }
`;
