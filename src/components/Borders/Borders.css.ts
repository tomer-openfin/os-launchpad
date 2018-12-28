import styled from 'styled-components';

interface Props {
  height?: string;
  width?: string;
}

const defaultProp = {
  height: '100vh',
  width: '100vw',
};

// border: 2px solid rgba(255, 255, 255, 0.03);
export const Borders = styled.div<Props>`
  position: relative;

  ${({ height = defaultProp.height, width = defaultProp.width }) => `
    height: ${height};
    width: ${width};
  `}

  &:before {
    border: 2px solid rgba(255, 255, 255, 0.03);
    bottom: 0px;
    content: '';
    display: block;
    left: 0px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1;
  }

  &:after {
    border: 1px solid rgba(0, 0, 0, 0.35);
    bottom: 0px;
    content: '';
    display: block;
    left: 0px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1;
  }
`;
