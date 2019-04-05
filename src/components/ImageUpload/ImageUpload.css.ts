import styled from 'styled-components';

import { Color } from '../../styles';

export const Wrapper = styled.div<{ height?: string; width?: string }>`
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  position: relative;
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  overflow: hidden;
`;

export const TabsWrapper = styled.div`
  background-color: ${Color.VACUUM};
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 30px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  margin: auto;
  flex: 1;
`;

export const Tab = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${Color.VACUUM};
  color: ${Color.MERCURY};
  display: flex;
  flex: 1;
  font-size: 10px;
  font-weight: 200;
  justify-content: center;
  outline: none;
  text-decoration: none;
  font-size: 16px;
  border-bottom: 2px solid ${Color.MERCURY};
  height: 100%;
  cursor: pointer;

  &:hover {
    background: ${Color.PLUTO};
  }

  ${({ active }) =>
    active &&
    `border-bottom: 2px solid ${Color.EARTH};
    color: ${Color.SUN};`}
`;
