import styled from 'styled-components';

interface Props {
  imgSrc: string;
  onClick: () => void;
}

const Snapshot = styled.div<Props>`
  background-position: center;
  background-size: contain;
  height: 100vh;
  width: 100vw;

  ${({ imgSrc }) => `
    background-image: url(${imgSrc});
  `}
`;

export default Snapshot;
