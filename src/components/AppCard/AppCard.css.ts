import styled from 'styled-components';

import { Color } from '../../styles';
import { SEAGULL } from '../../styles/color';
import { Icon } from '../IconSpace/IconSpace.css';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Color.WHITE};
  height: 92px;
  padding: 12px 32px;
  background: ${Color.CHARCOAL};

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
  justify-content: space-between;
  flex-direction: column;
  color: ${Color.WHITE};
  font-weight: 200;
  padding: 0 0 0 16px;
  height: 100%;
  flex: 1;
`;

export const AppName = styled.div`
  font-weight: 200;
  font-size: 16px;
  text-transform: capitalize;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const AppDescription = styled.div`
  font-weight: 200;
  font-size: 11px;
  height: 28px;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CTA = styled.button`
  width: 100px;
  height: 24px;
  font-size: 9px;
  color: ${Color.SEAGULL};
  background: ${Color.TRANSPARENT};
  border: 1px solid ${Color.SEAGULL};
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${Color.CHARCOAL};
    background: ${Color.SEAGULL};
  }
`;
