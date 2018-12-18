import styled from 'styled-components';

import { Color } from '../../styles/index';
import { Icon } from '../IconSpace/IconSpace.css';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Color.SUN};
  height: 55px;
  width: 100%;

  ${Icon} {
    height: 68px;
    width: 68px;
  }

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
  padding: 10px 20px;
  height: 100%;
  flex-grow: 1;
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  text-transform: capitalize;
  min-height: 22px;
  flex-shrink: 0;
`;

export const UserEmail = styled.div`
  font-weight: 200;
  font-size: 11px;
  overflow: hidden;
  color: ${Color.MERCURY};
`;

export const CTAWrapper = styled.div`
  height: 100%;
  width: 100px;
  flex-shrink: 0;
`;
