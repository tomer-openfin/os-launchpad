import styled from 'styled-components';

import { Color, Typography } from '../../styles';

interface Props {
  onClick?: () => void;
  isLoading: boolean;
}

export const Wrapper = styled.div<Props>`
  cursor: ${({ isLoading }) => (isLoading ? 'progress' : 'inherit')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Color.SUN};
  min-height: 140px;
  width: 100%;

  &:hover {
    background: ${Color.SPACE_DUST};
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color: ${Color.SUN};
  font-weight: 200;
  padding: 20px 0;
  height: 100%;
  flex-grow: 1;
`;

export const AppName = styled.div<Props>`
  ${({ isLoading, onClick }) => {
    const cursorType = onClick ? 'pointer' : 'default';

    return `cursor: ${isLoading ? 'progress' : cursorType};`;
  }}

  flex-shrink: 0;
  font-size: 16px;
  font-weight: 500;
  min-height: 22px;

  &:hover {
    text-decoration: underline;
  }
`;

// line-clamp for multi-line text ellipsis
export const AppDescription = styled.div`
  ${Typography.TypeStyleSol}

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  color: ${Color.MERCURY};
  display: -webkit-box;
  overflow: hidden;
`;

export const CTAWrapper = styled.div`
  height: 100%;
  width: 60px;
  flex-shrink: 0;
`;

export const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  justify-content: flex-start;
  padding: 20px 0;
  width: 80px;
`;
