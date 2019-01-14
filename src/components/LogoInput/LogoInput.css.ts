import styled from 'styled-components';

import { Color } from '../../styles';
import { TypeStyleCanopus } from '../../styles/typography.css';

interface WrapperProps {
  active: boolean;
}

export const Input = styled.input`
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  max-width: 180px;
`;

export const Placeholder = styled.div`
  ${TypeStyleCanopus}

  color: ${Color.SUN};
  opacity: 0.5;
  margin: auto;
`;

export const LogoWrapper = styled.div`
  outline: 1px dashed ${Color.SUN};
`;

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  max-height: 80px;
  position: relative;
  text-transform: none;

  &:hover {
    ${LogoWrapper} {
      outline-color: ${Color.JUPITER};
    }
  }

  ${({ active }) => `
    ${active ? `${LogoWrapper} { outline-color: ${Color.JUPITER}; }` : ''}
  `}
`;
