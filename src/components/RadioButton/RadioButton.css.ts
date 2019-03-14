import styled from 'styled-components';

import { Color, Typography } from '../../styles';

interface LabelProps {
  checked: boolean | undefined;
}

export const Input = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;

export const Label = styled.label<LabelProps>`
  ${Typography.TypeStyleProcyon}

  align-items: center;
  color: ${Color.SUN};
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  height: 44px;
  justify-content: center;
  margin: 0;
  overflow: hidden;
  width: 44px;

  ${({ checked }) => `
    background-color: ${checked ? Color.EARTH : Color.MERCURY};
    opacity: ${checked ? 1 : 0.75};

    &:hover {
      background-color: ${checked ? Color.NEBULA : Color.MOON};
      opacity: 1;
    }
  `}
`;
