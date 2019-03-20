import styled from 'styled-components';
import Color from '../../styles/color';
import { hexToRgba, Typography } from '../../styles/index';

export const Wrapper = styled.div``;

export const StyledTextArea = styled.textarea<{ height: number; width: string }>`
  ${Typography.TypeStyleCanopus}
  height: ${({ height }) => height}px;
  width: ${({ width }) => width};
  padding: 7px 9px;
  resize: none;
  box-shadow: 2px 2px 7px 0 ${hexToRgba(Color.VACUUM, 0.5)};

  &::placeholder {
    opacity: 0.3;
  }
`;
