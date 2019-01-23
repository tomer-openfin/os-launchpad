import styled from 'styled-components';

import { Color } from '../../styles';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Color.SUN};
  height: 132px;
  width: 100%;

  &:hover {
    background: ${Color.DUSTY_GREY};
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

export const AppName = styled.div`
  font-weight: 500;
  font-size: 16px;
  text-transform: capitalize;
  min-height: 22px;
  flex-shrink: 0;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const AppDescription = styled.div`
  font-weight: 200;
  font-size: 11px;
  overflow: hidden;
  color: ${Color.MERCURY};
`;

export const CTAWrapper = styled.div`
  height: 100%;
  width: 60px;
  flex-shrink: 0;
`;

export const IconWrapper = styled.div`
  height: 100%;
  width: 80px;
  padding: 20px 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
