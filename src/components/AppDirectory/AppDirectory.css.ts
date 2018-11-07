import styled from 'styled-components';

import * as gradient from '../../assets/gradient.svg';
import { Color, Typography } from '../../styles';
import { HProps } from '../../styles/typography.css';

export const Wrapper = styled.div`
  background: ${Color.CHARCOAL};
`;

export const Directory = styled.div`
  position: relative;
  width: 100%;
  height: 603px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const AppCard = styled.div`
  display: block;
  color: ${Color.WHITE}
  border: 1px solid ${Color.WHITE}
  width: 402px;
`;

export const AppCardRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AppName = styled<HProps>(Typography.H3)`
  color: ${Color.WHITE}
  padding: 0 32px;
  text-transform: capitalize;
`;

export const AppDescription = styled.div`
  padding: 5px 0;
  line-height: 30px;
  margin: 0 auto;
  max-height: 134px;
  overflow: scroll;
  width: 268px;
`;

export const Heading = styled<HProps>(Typography.H3)`
  padding: 0 16px;
  color: ${Color.WHITE};
  background: url(${gradient});
  background-size: cover;
  background-repeat: no-repeat;
  position: static;
  width: 100%;
  z-index: 9999;
  -webkit-app-region: drag;
`;

export const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  background: ${Color.CHARCOAL};
  z-index: 2;

  &:hover {
    display: block;
  }
`;

export const WithTooltip = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
      display: block;
    }
  }
`;

export const ToggleButtonWrapper = styled.div<{ rotated: boolean }>`
  transform: rotate(${props => (props.rotated ? '45deg' : '0')});
`;
