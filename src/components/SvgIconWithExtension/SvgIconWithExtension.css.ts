import styled from 'styled-components';

import { DirectionalPosition } from '../../types/commons';

import SvgIcon, { Icon } from '../SvgIcon';

interface WrapperProps {
  clickable: boolean;
  color?: string;
  isBackground?: boolean;
  hoverColor?: string;
  extensionPosition: DirectionalPosition;
}

const getCaretRotation = (extensionPosition: DirectionalPosition) => {
  switch (extensionPosition) {
    case DirectionalPosition.Top:
      return `
        top: -33%;
        transform: translate3d(-50%, 0, 0) rotate(180deg);
        left: 50%;
      `;
    case DirectionalPosition.Left:
      return `
        left: -33%;
        transform: translate3d(0, -50%, 0) rotate(90deg);
        top: 50%;
      `;
    case DirectionalPosition.Right:
      return `
        right: -33%;
        transform: translate3d(0, -50%, 0) rotate(270deg);
        top: 50%;
      `;
    default:
      return `
        bottom: -33%;
        transform: translate3d(-50%, 0, 0);
        left: 50%;
      `;
  }
};

export const CaretSvgIcon = styled(SvgIcon)`
  position: absolute;
`;

export const Wrapper = styled.div<WrapperProps>`
  display: inline-block;
  line-height: 0;
  position: relative;

  ${({ clickable, color, isBackground, hoverColor, extensionPosition }) => `
    ${CaretSvgIcon} {
      ${getCaretRotation(extensionPosition)}
    }

    ${
      isBackground
        ? ''
        : `&:hover {
          ${Icon} {
            background-color: ${clickable ? hoverColor : color};
          }
        }`
    }
`}
`;
