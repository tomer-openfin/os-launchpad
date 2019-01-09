import styled, { css } from 'styled-components';

import SvgIcon from '../SvgIcon';

import { Color, Typography } from '../../styles';
import { SYSTEM_ICON } from '../../utils/sizingConstants';

interface Props {
  count: number;
}

const setBackgroundColor = count => {
  if (count <= 0) {
    return css`
      background-color: ${Color.COMET};
    `;
  } else {
    return css`
      background-color: ${Color.JUPITER};
    `;
  }
};

export const Count = styled.div`
  ${Typography.TypeStyleProcyon};

  align-items: center;
  color: ${Color.SUN};
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;

  &:hover {
    opacity: 0.75;
  }
`;

export const NotificationsIcon = styled(SvgIcon)<Props>`
  ${({ count }) => setBackgroundColor(count)}
`;

export const Wrapper = styled.div`
  position: relative;
  width: ${SYSTEM_ICON}px;
  height: ${SYSTEM_ICON}px;
`;
