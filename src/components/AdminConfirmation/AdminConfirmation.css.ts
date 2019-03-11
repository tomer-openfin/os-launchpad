import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';

export const Heading = styled.div`
  background-color: ${Color.KUIPER_BELT};
  width: 100%;
`;

export const HeadingText = styled.div`
  ${Typography.TypeStyleProcyon}

  padding: 20px 0 18px 20px;
  color: ${Color.SUN};
`;

export const ButtonWrapper = styled.div`
  align-items: center;
  align-self: flex-end;
  display: flex;
  flex-wrap: nowrap;
  padding-right: 20px;
  padding-bottom: 18px;

  button:nth-child(2) {
    margin-left: 11px;
  }
`;

export const CopyWrapper = styled.div`
  padding: 36px 19px 24px 20px;
  width: 100%;
`;

export const Copy = styled.div`
  ${Typography.TypeStyleArcturus}
  ${textEllipsis}

  color: ${Color.SUN};
  flex: 1;
  white-space: pre-wrap;
  width: 100%;
`;

export const Error = styled.div<{ shown?: boolean }>`
  background-color: ${Color.MARS};
  color: ${Color.VACUUM};
  position: relative;
  font-size: 10px;
  height: auto;
  display: ${({ shown }) => (shown ? 'block' : 'none')};
`;

export const Wrapper = styled.div<{ height?: string; width?: string }>`
  align-items: flex-start;
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || '219px'};
  width: ${({ width }) => width || '420px'};
  justify-content: flex-start;
`;
