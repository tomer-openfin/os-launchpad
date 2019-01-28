import styled from 'styled-components';

import { Color } from '../../styles/index';
import { TypeStyleCanopus, TypeStyleProcyon } from '../../styles/typography.css';

import SvgIcon from '../SvgIcon/SvgIcon';

const CTA_WIDTH = 100;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Color.SUN};
  height: 55px;
  width: 100%;

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
  flex: 0;
  max-width: calc(100% - ${CTA_WIDTH}px);

  @media (max-width: 600px) {
    padding-top: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const NameAndBadgeWrapper = styled.div`
  display: flex;
  min-width: 200px;
  max-width: 100%;
  min-height: 25px;
  flex: 0;
  padding: 0 0 0 20px;
  align-items: flex-start;
  margin: auto 0;
`;

export const UserName = styled.div`
  ${TypeStyleProcyon}

  text-transform: capitalize;
  min-height: 22px;
  margin: auto 5px auto 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Badge = styled(SvgIcon)`
  margin: auto 0;
  flex-shrink: 0;
`;

export const UserEmail = styled.div`
  ${TypeStyleCanopus}

  max-width: 100%;
  padding: 0 20px;
  color: ${Color.MERCURY};
  margin: auto 0;
  flex-shrink: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CTAWrapper = styled.div`
  height: 100%;
  width: ${CTA_WIDTH}px;
  padding-right: 10px;
  flex-shrink: 0;
`;
