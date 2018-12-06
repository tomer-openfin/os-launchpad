import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';

import AppIndicator from '../AppIndicator';
import { Props } from './AppIcon';

interface StyledAppIndicatorProps {
  position: DirectionalPosition;
}

export const Wrapper = styled.div`
  cursor: pointer;
  padding: 8px;
  position: relative;
`;

export const Icon = styled.div<Partial<Props>>`
  background: url(${props => props.imgSrc || ''});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

export const StyledAppIndicator = styled(AppIndicator)<StyledAppIndicatorProps>`
  position: absolute;

  ${props => {
    switch (props.position) {
      case DirectionalPosition.Right: {
        return `
          right: 1px;
          top: calc(50% - 3px);
        `;
      }
      case DirectionalPosition.Bottom: {
        return `
          bottom: 3px;
          left: calc(50% - 3px);
        `;
      }
      case DirectionalPosition.Left: {
        return `
          left: 1px;
          top: calc(50% - 3px);
        `;
      }
      case DirectionalPosition.Top:
      default: {
        return `
          top: 3px;
          left: calc(50% - 3px);
        `;
      }
    }
  }}
`;
