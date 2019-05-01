import styled from 'styled-components';

interface Props {
  backgroundColor: string;
}

const SnapshotOverlay = styled.div<Props>`
  background-position: center;
  background-size: contain;
  height: 100vh;
  width: 100vw;

  ${({ backgroundColor }) => `
    background-color: ${backgroundColor};
  `}
`;

export default SnapshotOverlay;
