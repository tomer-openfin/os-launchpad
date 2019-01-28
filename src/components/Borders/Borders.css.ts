import styled from 'styled-components';

interface Props {
  height?: string;
  width?: string;
  borderRadius?: string;
}

const defaultProp = {
  height: '100vh',
  width: '100vw',
};

// border: 2px solid rgba(255, 255, 255, 0.03);
export const Borders = styled.div<Props>`
  align-items: inherit;
  display: inherit;
  flex-direction: inherit;
  justify-content: inherit;
  position: relative;

  ${({ height = defaultProp.height, width = defaultProp.width }) => `
    height: ${height};
    width: ${width};
  `}

  &:before {
    border: 2px solid rgba(255, 255, 255, 0.03);
    border-radius: ${props => props.borderRadius};
    bottom: 0px;
    content: '';
    display: block;
    left: 0px;
    position: absolute;
    pointer-events: none;
    right: 0px;
    top: 0px;
    z-index: 1;
  }

  &:after {
    border: 1px solid rgba(0, 0, 0, 0.35);
    border-radius: ${props => props.borderRadius};
    bottom: 0px;
    content: '';
    display: block;
    left: 0px;
    position: absolute;
    pointer-events: none;
    right: 0px;
    top: 0px;
    z-index: 1;
  }
`;
