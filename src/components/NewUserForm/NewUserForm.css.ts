import styled from 'styled-components';

// placeholder styles until designs come in
export const Input = styled.input`
  margin-left: 10px;
`;

export const Select = styled.select`
  margin-left: 10px;
`;

export const Label = styled.label`
  padding: 10px;
`;

export const Form = styled.form`
  align-items: center;
  border: 2px solid dodgerblue;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  justify-content: center;
  width: 100vw;
`;

// placeholder message until design/flow comes in
export const Message = styled.div`
  background-color: #4dba2c;
  display: flex;
  color: black;
  font-size: 1.5em;
  margin: 10px 10px;
  padding: 10px 10px;
`;

export const ErrorMessage = styled(Message)`
  background-color: #f46542;
  color: white;
`;
