import styled from 'styled-components';

// placeholder styling until designs come in
export const StyledButton = styled.button`
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

export const StyledError = styled.div`
  background-color: crimson;
  color: offwhite;
  display: block;
`;

export const StyledLabel = styled.label`
  display: block;
  height: 20px;
  margin: 30px 5px;
  & > input,
  & > select {
    margin-left: 15px;
  }
`;

export const StyledWrapper = styled.div`
  align-items: center;
  border-radius: 3px;
  border: 1px solid dodgerblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;

  & > button {
    margin-right: 5px;
  }
`;

// placeholder message until design/flow comes in
export const Response = styled.div`
  background-color: #4dba2c;
  display: flex;
  color: black;
  font-size: 1.25em;
  margin: 10px 10px;
  padding: 10px 10px;
`;

export const ErrorResponse = styled(Response)`
  background-color: #f46542;
  color: white;
`;
