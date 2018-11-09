import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: flex-end;
  margin-left: 20px;
`;

export const StyledInput = styled.input`
  border-radius: 3px;
  border: none;
  display: block;
  font-family: 'Garamond', sans-serif;
  font-size: 1.25em;
  margin: 10px;
  padding: 5px;

  &:focus {
    outline: 0;
  }
`;

export const StyledH1 = styled.h1`
  text-transform: uppercase;
  color: dodgerblue;
  font-family: 'Garamond', sans-serif;
  margin: 10px;
`;

export const StyledSelect = styled.select`
  margin: 10px;
  width: 15%;
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
  height: 75vh;
  width: 75vw;

  & > ul {
    list-style: none;
  }
`;
