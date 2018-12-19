import styled from 'styled-components';

import { Color } from '../../styles/index';
import { TypeStyleCanopus, TypeStyleProcyon } from '../../styles/typography.css';
import { Icon } from '../IconSpace/IconSpace.css';

import * as AdminIcon from '../../assets/Admin.svg';

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
  align-items: center;
  color: ${Color.SUN};
  font-weight: 200;
  height: 100%;
  flex: 1;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const NameAndBadgeWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-shrink: 0;
  padding: 0 20px;
  align-items: flex-start;
`;

export const UserName = styled.div`
  ${TypeStyleProcyon}

  text-transform: capitalize;
  min-height: 22px;
  flex: 0;
  white-space: nowrap;
  margin: auto 0;
`;

export const AdminBadge = styled.div<{ isAdmin: boolean }>`
${props =>
  props.isAdmin &&
  `
  mask:url(${AdminIcon});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  `}

  background-color: ${props => (props.isAdmin ? Color.JUPITER : Color.VOID)};
  height: 16px;
  width: 16px;
  margin: auto 0 auto 5px;
`;

export const UserEmail = styled.div`
  ${TypeStyleCanopus}

  overflow: hidden;
  padding: 0 20px;
  color: ${Color.MERCURY};
  margin: auto 0;
  flex-shrink: 0;
  flex: 2;

  @media (max-width: 600px) {
    flex: 1;
  }
`;

export const CTAWrapper = styled.div`
  height: 100%;
  width: 100px;
  padding-right: 10px;
  flex-shrink: 0;
`;
