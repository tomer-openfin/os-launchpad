import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';
import SvgIcon from '../SvgIcon';

export const DeleteIcon = styled(SvgIcon)`
  opacity: 0.25;

  &:hover {
    opacity: 1;
  }
`;

export const Text = styled.div`
  ${Typography.TypeStyleAlgol}
  ${textEllipsis};

  color: ${Color.SUN};
  flex: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
