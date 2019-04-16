import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';

export const Wrapper = styled.div`
  align-items: center;
  color: ${Color.SUN};
  display: flex;
`;

export const Cell = styled.div<{ isClickable?: boolean }>`
  align-items: center;
  display: inline-flex;

  ${({ onClick }) =>
    onClick
      ? `
        cursor: pointer;

        &:hover {
          color: ${Color.JUPITER};
        }
      `
      : ''}
`;

export const Dot = styled.div<{ color: string }>`
  border-radius: 100%;
  display: inline-block;
  flex-shrink: 0;
  height: 18px;
  margin-right: 12px;
  width: 18px;

  ${({ color }) => `
    background-color: ${color};
  `}
`;

export const Name = styled.div`
  ${Typography.TypeStyleArcturus}
  ${textEllipsis}
`;

export const Text = styled.div<{ isDisabled?: boolean }>`
  ${Typography.TypeStylePollx}
  display: inline-block;

  ${({ isDisabled }) => `
    color: ${isDisabled ? Color.MERCURY : 'inherit'};
  `}
`;
