import styled from 'styled-components';

import { Color } from '../../styles';
import { FOOTER_HEIGHT, ResponsiveWidth } from '../Responsive';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
`;

export const MessageBannerWrapper = styled.div`
  ${ResponsiveWidth}

  bottom: ${FOOTER_HEIGHT};
  position: absolute;
  padding: 0 20px;
`;
