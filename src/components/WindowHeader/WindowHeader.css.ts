import styled from 'styled-components';

import { Color } from '../../styles';

import { Icon } from '../SvgIcon';

export const CtaWrapper = styled.div`
  -webkit-app-region: drag !important;
  align-items: center;
  background: ${Color.VACUUM};
  display: flex;
  height: 100%;
  padding: 0 17.5px;

  ${Icon} {
    z-index: 1;
  }
`;

export const Header = styled.div<{ backgroundColor?: string; isDragDisabled?: boolean }>`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: ${Color.SUN};
  display: flex;
  flex-shrink: 0;
  height: 60px;
  justify-content: space-between;
  position: relative;
  text-align: center;
  width: 100%;

  &:before {
    -webkit-app-region: drag !important;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &:after {
    -webkit-app-region: no-drag !important;
    content: '';
    display: block;
    position: absolute;

    ${({ isDragDisabled }) => `
      height: ${isDragDisabled ? '100%' : '0'};
      width: ${isDragDisabled ? '100%' : '0'};
    `}
  }
`;

export const Children = styled.div`
  -webkit-app-region: drag !important;
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  text-align: center;
`;

export const Title = styled.div`
  -webkit-app-region: drag !important;
  padding: 20px;
`;
