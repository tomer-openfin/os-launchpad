import styled from 'styled-components';

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
  background-color: #4dba2c;
  display: flex;
  color: black;
  font-size: 12px;
  margin: 5px 5px;
  padding: 5px 5px;
`;

export const Error = styled.div`
  background-color: crimson;
  color: offwhite;
  display: block;
  height: auto;
`;

export const Wrapper = styled.div`
  align-items: center;
  background-color: #edeeef;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;

  & > button {
    margin-right: 5px;
  }
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

export const H3 = styled.h3`
  text-align: center;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 1.25rem;
  color: dodgerblue;
`;
