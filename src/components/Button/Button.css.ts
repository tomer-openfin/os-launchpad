import styled from 'styled-components';

interface ButtonProps {
  backgroundColor: string;
  color: string;
  width: number;
}

export const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: flex;
  display: inline-block;
  justify-content: center;
  padding: 10px 20px;
  width: ${props => props.width}px;
`;
