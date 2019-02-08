import styled from 'styled-components';

import { Color, hexToRgba } from '../../styles';
import { TypeStyleProcyon } from '../../styles/typography.css';

import CloseButton from '../CloseButton';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Banner = styled.div<{ backgroundColor?: Color; shown?: boolean }>`
  ${TypeStyleProcyon}

  background-color: ${({ backgroundColor }) => hexToRgba(backgroundColor || Color.MARS, 0.95)};
  color: ${Color.SUN};
  height: auto;
  min-height: 60px;
  max-height: 140px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translate3d(0, ${({ shown }) => (shown ? '0' : '140px')}, 0);
  bottom: 0;
  position: absolute;
  width: 100%;

  transition: transform 1s ease-in-out;
`;

export const MessageWrapper = styled.div`
  max-height: 100px;
  margin-right: 20px;
  overflow-y: auto;
`;

export const StyledCloseButton = styled(CloseButton)`
  flex-shrink: 0;
`;
