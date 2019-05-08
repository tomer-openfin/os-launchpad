import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';
import SvgIcon from '../SvgIcon';

export const Icon = styled(SvgIcon)`
  ${({ isActive }) => `
    opacity: ${isActive ? 1 : 0.25};

    &:hover {
      opacity: 1;
      ${isActive ? `background-color: ${Color.JUPITER_HOVER};` : ''}
    }
  `}
`;

export const Dot = styled.div<{ color: string }>`
  border-radius: 100%;
  flex-shrink: 0;
  height: 12px;
  width: 12px;

  ${({ color }) => `
    background-color: ${color || 'transparent'};
  `}
`;

export const Text = styled.p`
  ${Typography.TypeStyleAlgol}
  ${textEllipsis}

  color: ${Color.SUN};
  cursor: pointer;
  flex: 1;
  margin: 0 7px;

  &:hover {
    color: ${Color.JUPITER};
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;
