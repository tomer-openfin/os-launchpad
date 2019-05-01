import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';
import SvgIcon from '../SvgIcon';

export const AddIcon = styled(SvgIcon)`
  opacity: 0.25;

  &:hover {
    opacity: 1;
  }
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
  flex: 1;
  margin: 0 7px;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;

  &:hover {
    ${Text} {
      color: ${Color.MOON};
    }
  }
`;
