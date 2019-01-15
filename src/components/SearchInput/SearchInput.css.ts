import styled from 'styled-components';

import { Color, Typography } from '../../styles';
import CloseButton from '../CloseButton';
import SvgIcon from '../SvgIcon';

interface Props {
  width: number;
}

export const SearchIcon = styled(SvgIcon)`
  left: 0;
  opacity: 0.25;
  position: absolute;
`;

export const ModifiedCloseButton = styled(CloseButton)`
  position: absolute;
  right: 4px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

export const Wrapper = styled.div<Props>`
  align-items: center;
  border-radius: 2px;
  display: inline-flex;
  min-width: ${props => props.width}px;
  overflow: hidden;
  position: relative;
`;

export const Input = styled.input`
  ${Typography.TypeStyleAlgol}

  background-color: ${Color.KUIPER_BELT};
  border: none;
  color: ${Color.SUN};
  outline: none;
  padding: 8px 28px 8px 41px;
  width: 100%;

  ::placeholder {
    color: ${Color.SUN};
    opacity: 0.25;
  }
`;
