import styled from 'styled-components';

export const Draggable = styled.div<{ isDragging: boolean }>`
  transition: opacity 50ms ease-in-out;

  ${({ isDragging }) => `
    opacity: ${isDragging ? `0` : '1'};
  `}
`;
